const Comments = require('../models/comment');
const Post = require('../models/Post');


module.exports.comment = async function(req,res){
        // const PostId = req.query.id;
        try{
            let post = await Post.findById(req.body.post);
            if(post){
                let comments = await Comments.create({
                    content:req.body.content,
                    User:res.locals.user._id,
                    Post: req.body.post
                });
                if(comments){
                    post.comment.push(comments);
                    post.save();
                }
               
            }
          res.redirect('/')
        }catch(error){

            console.log("Error",error);
            return;
        }

       
       
}

module.exports.destroy = async function(req,res){
    try {

        let comment = await Comments.findById(req.params.id);

        if(comment.User == req.user.id){
            let PostId = comment.Post;
            comment.remove();
    
            let post = await Post.findByIdAndUpdate(req.params.id,{$pull: {comment:req.params.id}});
    
        }
        return res.redirect('/') ;

    } catch (error) {
        console.log("Error",error);
        return;
    }
  
   
}

// Less neater version of destroying comment

// module.exports.destroy1 = async function(req,res){
//   Comments.findById(req.params.id, function(err,comment){
    // if(comme  Comments.findById(req.params.id, function(err,comment){nt.User == req.user.id){
//         let postId = comment.Post;
//         comment.remove();
//         Post.findByIdAndUpdate(postId,{ $pull : {comment:req.params.id}},function(err,post){
          
//             return res.redirect('/') 
//         });
//     }else{
//         res.redirect('/')
//     }
// })
// }
// Less neater version for creating the comments

// Post.findById(req.body.post,function(err,post){
//     if(post){
//         Comments.create({
//             content: req.body.content,
//             User: res.locals.user._id,
//             Post: req.body.post
//          },function(err,comment){
//             if(err){console.log("error while adding comment to the database"); return;}
//             post.comment.push(comment);
//             post.save();
//             res.redirect('/');
//         })
//     }
// })
