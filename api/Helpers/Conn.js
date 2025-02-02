require('mongoose')
// .connect('mongodb://localhost:27017/SocialMedia_2')
.connect('mongodb+srv://mandloiyash04official1:9EKcl16veJKELHrr@cluster0.lllqb.mongodb.net/')
.then(()=>{
  console.log('MongoDB Connected');
})
.catch(()=>{
  console.log('MongoDB Not Connected');
})

// Uername: mandloiyash04official1
// Pw : 9EKcl16veJKELHrr