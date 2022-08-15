const categoryModel = require("../../models/category")

module.exports.addCategory = async (req, res) => {
    try{

        const {title, description, image} = req.body;

        if(!title || !description) return res.send("Fields are empty")

        let category = new categoryModel(req.body)
        category.save()

        return res.json({
            success : true,
            message : "category inserted successfully",
            data : category
        })

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.getCategories = async (req, res) => {
    try{

        const categories = await categoryModel.find();
        const categoriesCount = await categoryModel.find().count();

        return res.json({
            success : true,
            status : 400,
            message : "list of all categories",
            categories,
            count : categoriesCount
        })

    }catch(error){
        return res.send(error.message)
    }
}


module.exports.updateCategory = async (req, res) => {
    try{

        const {title, description, image} = req.body;
        const {id} = req.query;

        // check if product exist with the given product id
        const category = await categoryModel.findOne({_id : id})

        if(category){
            const updatedCategory = await categoryModel.findOneAndUpdate({_id : id}, req.body, {new :true})

            return res.json({
                success : true,
                status : 200,  
                message : "category updated successfully",
                data : updatedCategory
            })
        }else{
            
            return res.json({
                success : false,
                status : 400,
                message : "category does not exist"
            })

        }

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.deleteCategory = async (req, res) => {
    try{

        const {id} = req.query;
        
        // check if product exist with the given product id
        const category = await categoryModel.findOneAndDelete({_id : id})
        if(!category){
            return res.json({
                success : false,
                message : "category does not exist",
            })
        }
        return res.json({
            success : true,
            message : "category deleted successfully",
        })

    }catch(error){
        return res.send(error.message)
    } 
}

// module.exports.getAllProducts = async (req, res) => {
//     try{

//         // Search through title names
//         var {search} = req.query
//         if(!search) search = ""

//         const products = await categoryModel.find({title:{'$regex' : search, '$options' : 'i'}})

//         return res.json({
//             success : true,
//             status : 200,
//             message : "list of products",
//             data : products
//         })

//     }catch(error){
//         return res.json({
//             success : false,
//             status : 400,
//             message : error.message
//         })
//     }
// }

