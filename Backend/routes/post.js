const router = require('express').Router()
const conn = require('../db/conn')
const upload = require('../middleware/upload')
const fs = require('fs');

// fetch post
router.get('/',async(req,res)=>{
    const search = req.query.search
    const advpost = req.query.advpost
    const pages = Number(req.query.page || 1) 
    const postPerPage = 9

    let parems = []
    let sql = `SELECT * FROM tbl_category 
                JOIN tbl_project ON tbl_category.cat_id = tbl_project.cat_id
                JOIN tbl_user ON tbl_project.user_id = tbl_user.user_id WHERE tbl_project.project_status = 'Active' LIMIT ?,?`

    if(advpost){
        sql = `SELECT * FROM tbl_category 
                JOIN tbl_project ON tbl_category.cat_id = tbl_project.cat_id
                JOIN tbl_user ON tbl_project.user_id = tbl_user.user_id WHERE tbl_project.project_status = 'Pending' AND tbl_user.tea_adv_id = ? `
        parems.push(advpost)
    }

    if(search){
        sql = `SELECT * FROM tbl_category 
        JOIN tbl_project ON tbl_category.cat_id = tbl_project.cat_id
        JOIN tbl_user ON tbl_project.user_id = tbl_user.user_id WHERE tbl_project.project_name LIKE ?`
        parems.push('%'+search+'%')
    }
    
    // cal from start page 
    const startIndex = (pages - 1) * postPerPage;
    parems.push(startIndex,postPerPage)
                
    try {
        conn.query(
            sql,
            parems,
            (err,result,field)=>{
                if (err){
                    console.log(err);
                    res.status(404).send(err)
                } 
                res.status(200).send({data : result})
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

// all post
router.get('/allpost',async(req,res)=>{
    const mypost = req.query.mypost

    let params = []
    let sql =  `SELECT * FROM tbl_project WHERE project_status = ? `

    if (mypost){
        sql = `SELECT * FROM tbl_category 
        JOIN tbl_project ON tbl_category.cat_id = tbl_project.cat_id
        JOIN tbl_user ON tbl_project.user_id = tbl_user.user_id WHERE tbl_project.project_status = 'Active' AND tbl_user.user_id = ?`    
        params.push(mypost)
    }

    params.push('Active')

    try {
        conn.query(
            sql,
            params,
            (err,result,field)=>{
                if (err){
                    res.status(404).send(err)
                }
                res.status(200).send({data : result})
            }   
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

// Create post
router.post('/create',upload,async(req,res)=>{
    const {user_id,project_name,project_description,cat_id} = req.body
    const project_img_filename = req.files.project_img_filename[0].filename; 
    const project_pdf_filename = req.files.project_pdf_filename[0].filename; 
    const project_pdf_path = req.files.project_pdf_filename[0].path;
    
    let sql = `INSERT INTO tbl_project (user_id, project_name, project_description, cat_id, project_img_filename, project_pdf_filename 
        ,project_pdf_path,project_status)
        VALUES (?, ?, ?, ?, ?, ?, ? ,'Pending')`
    
    let params = [user_id,project_name,project_description,cat_id,project_img_filename,project_pdf_filename,project_pdf_path]
    
    try {
        conn.query(
            sql,
            params,
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

// Singal post
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    
    let parems = []
    let sql = `SELECT * FROM tbl_category 
            JOIN tbl_project ON tbl_category.cat_id = tbl_project.cat_id 
            JOIN tbl_user ON tbl_project.user_id = tbl_user.user_id WHERE tbl_project.project_id = ? `
    parems.push(id)

    try {   
        conn.query(
            sql,
            parems,
            (err,result,field)=>{
                if (err){
                    console.log(err);
                    res.status(404).send(err)
                }      
                res.status(200).send({data : result})
                }
        )   
    } catch (error) {
        res.status(400).send(error)
    }
})

// Approve
router.put('/approve',async(req,res)=> {
    const proId = req.body.proId
    let sql = 'UPDATE tbl_project SET project_status = ? WHERE tbl_project.project_id = ?'
    try {
        conn.query(
            sql,
            ['Active',proId],
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


// Reject
router.put('/reject',async(req,res)=> {
    const proId = req.body.proId
    let sql = 'UPDATE tbl_project SET project_status = ? WHERE tbl_project.project_id = ?'
    try {
        conn.query(
            sql,
            ['Reject',proId],
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

// Download PDF
router.get('/PDF/:id',async(req,res)=>{
    const id = req.params.id
    let sql = `SELECT project_pdf_filename,project_pdf_path FROM tbl_project WHERE project_id = ?`

    try {
        conn.query(
            sql,
            [id],
            (err,result,field)=>{
                if(err){
                    res.status(404).send(err)
                }
                const { project_pdf_path, project_pdf_filename } = result[0];

                // download method if you want to get download to your computer
                res.download(project_pdf_path, project_pdf_filename, (err) => {
                    if (err) {
                      console.error(err);
                      res.sendStatus(500);
                    }
                })
            }   
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router