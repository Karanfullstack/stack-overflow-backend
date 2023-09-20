const Question = require('../models/Question');

const questionController = {
  // POST QUESTION
  async postQuestion(req, res){
  try {
    const question = new Question({
    user:req.user._id,
    text:req.body.text,
    name:req.user.name
  });

  await question.save()
  res.status(201).json({success:true, message:'Quetion posted successfully', question})
  } catch (error) {
    console.log(error)
    }
  },


   // GET QUESTIONS ALL

  async getQuestions(req, res){
    try {
      const questions = await Question.find().populate("answers.user",["name","profilepic"])
      if(!questions){
        return res.status(401).json({success:fase, message:"No Questions Found!"})
      }
      res.status(201).json({success:true, length:questions.length, questions})
    } catch (error) {
      
    }
  },

  // GET QUESTION BY ID
  async getQuestionById(req,res){
    
    try {
      const question = await Question.findById(req.params.id).populate("answers.user",["name","profilepic"])
      if(!question){
        return res.status(404).json({success:false, message:"No Question Available"})
      }
      res.status(201).json({success:true, question})
    } catch (error) {
      console.log(error.message)
    }
  },

   // POST UPVOTE BY ID

   async upVote(req, res){
      try {
        const question = await Question.findById(req.params.id).populate()
        if(!question){
          return res.status(404).json({success:false, message:"Question Is Not Available"})
        }
        // upvote logic...

        const userVoteIndex = question.upvotes.findIndex(item => item.user.toString() === req.user._id.toString())
        
        if(userVoteIndex !== -1){
          question.upvotes = question.upvotes.filter(item => item.user.toString() !== req.user._id.toString())
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

   // POST ANSWERS BY USER
   async postAnswer(req, res){
      try {
        // get question id where you want to post answer
        const question = await Question.findById(req.params.id)
        if(!question){
          return res.status(404).json({sucess:false, message:"No Question Found"})
        }
        // creating new answer
        const newAnswer = {
          text:req.body.text,
          user:req.user._id,
          name:req.user.name
        }
        question.answers.unshift(newAnswer)
        await question.save()
        res.status(201).json({sucess:true, message:"Answer posted sucessfully", question})
      } catch (error) {
        console.log(error)
      }
   },

   // POST ANSWERS BY USER
   async deleteAnswer(req, res){
      try {
        const question = Question.findById(req.params.id);
        if(!question) return res.status(404).json({message})
      } catch (error) {
        
      }
   }
}


module.exports = questionController