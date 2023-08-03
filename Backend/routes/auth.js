const router = require('express').Router()
const conn = require('../db/conn')

// LOGIN USER 
router.post('/',async(req,res)=>{
    const {user_email,user_password} = req.body

    let sql = `SELECT * FROM tbl_user WHERE user_email = ? AND user_password = ?` 

    try {
        conn.query(
            sql,
            [user_email,user_password],
            (err,result,field)=>{
                if (err){
                    res.status(404).send(err)
                }

                res.status(200).send(result)
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }

})

// LOGIN ADV
router.post('/Adv',async(req,res)=>{
    const {tea_adv_username,tea_adv_password} = req.body

    let sql = `SELECT * FROM tbl_teacher_adv WHERE tea_adv_username = ? AND tea_adv_password = ?` 

    try {
        conn.query(
            sql,
            [tea_adv_username,tea_adv_password],
            (err,result,field)=>{
                if (err){
                    res.status(404).send(err)
                }

                res.status(200).send(result)
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router