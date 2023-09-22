async upVote(req, res){
      try {
        const question = await Question.findById(req.params.id).populate()
        if(!question){
          return res.status(404).json({success:false, message:"Question Is Not Available"})
        }
        // upvote logic...

        const userVoteIndex = question.upvotes.findIndex(item => item.user.toString() === req.user._id.toString())
        
        if(userVoteIndex !== -1){
         question.upvotes.splice(userVoteIndex, 1)
          await question.save();
          return res.status(201).json({sucess:true, question})
        }
         else{
            question.upvotes.unshift({user:req.user._id})
            question.save()
            return res.status(201).json({sucess:true, message:"Upvoted Sucess", question})
         }
      } catch (error) {
        console.log(error)
            res.status(500).json({ success: false, message: "An error occurred while Upvoting and Unvoting." });

      }
   },
