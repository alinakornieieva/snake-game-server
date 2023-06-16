const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const db = require('./db')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/get-record-holders', async(req, res) => {
    try {
        const recordHolders = await db.query(`SELECT * FROM record_holders`)
        res.json(recordHolders.rows)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }  
})

app.post('/post-score', async(req, res) => {
    try {
        const {name, score} = req.body
        await db.query(`INSERT INTO "record_holders" ("name", "score")
        VALUES($1, $2)`, [name, score])
        res.json({success: true})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))