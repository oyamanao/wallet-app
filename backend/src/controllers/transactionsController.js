import { sql } from "../config/db.js"
import express from "express"

export async function getTransactionsByUserId(req,res) {
    try {
        const {userId} = req.params;
        
        const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;

        res.status(200).json(transactions);
    } catch (error) {
        console.log('An Error occoured getting the transaction',error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

export async function getSummaryByUserId(req,res){
    try {
        const {userId} = req.params;

        const balanceResult = await sql`
        SELECT COALESCE(SUM(ammount),0) as balance FROM transactions
        WHERE user_id=${userId}
        `
        const expensesResult = await sql`
        SELECT COALESCE(SUM(ammount),0) as expenses FROM transactions
        WHERE user_id=${userId} AND ammount < 0
        `

        const incomeResult = await sql`
        SELECT COALESCE(SUM(ammount),0) as income FROM transactions
        WHERE user_id=${userId} AND ammount > 0
        `
        res.status(200).json({
            balance:balanceResult[0].balance,
            income:incomeResult[0].income,
            expenses:expensesResult[0].expenses

        })

    } catch (error) {
        console.log('An Error occoured getting user summary',error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

export async function createTransaction(req,res){
    try {
        const {title,ammount,category,user_id} = req.body; //req.body only stores value due to the middleware or else they are undefined

        if (!title || !category || !user_id || ammount===undefined){
            return res.status(400).json({message:"All fields are required"}); //status code 400 means error
        }

        const transaction = await sql`
        INSERT INTO transactions(user_id,title,ammount,category)
        VALUES(${user_id},${title},${ammount},${category})
        RETURNING *
        `
        console.log("A transaction was made",transaction);
        res.status(201).json(transaction[0]);   //status code 201 means something created

    } catch (error) {
        console.log('An Error occoured during the transaction',error)
        res.status(500).json({message:'Internal Server Error'})
    }

}

export async function deleteTransactionById(req,res) {

    try {
        const {id}=req.params;

        if(isNaN(parseInt(id))){
            return res.status(404).json({message:"Invalid Transaction Id"})
        }

        const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *
        ` ;

        

        if(result.length === 0){
            return res.status(404).json({message:"Transaction not found"})
        }

        res.status(200).json({message:"Transaction deleted successfully"})

    } catch (error) {
        console.log('An Error occoured deleting the transaction',error)
        res.status(500).json({message:'Internal Server Error'})
    }
}
