  module.exports=getDate;
 function getDate(){
let today=new Date()
    let options=
    {
        weekday:'long',
        day:'numeric',
        month:'long',
        year:'numeric'
    }

    let day=today.toLocaleDateString("en-US",options)

    res.render('list',{listTitle:day,newListItems:items})
    return day

}