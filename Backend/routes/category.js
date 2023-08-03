const router = require('express').Router()
const conn = require('../db/conn')

router.get('/',async(req,res)=>{
    let sql = `SELECT * FROM tbl_category `

    try {
        conn.query(
            sql,
            (err,result,field)=>{
                if (err){
                    console.log(err);
                    res.status(404).send(err)
                }
                
                res.status(200).send(result)
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

// Singal Category
router.get('/cat/:id',async(req,res)=>{
    const id = req.params.id
    let sql = `SELECT * FROM tbl_category JOIN tbl_project ON tbl_category.cat_id = tbl_project.cat_id WHERE tbl_project.cat_id = ? `

    try {
        conn.query(
            sql,
            id,
            (err,result,field)=>{
                if (err){
                    console.log(err);
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