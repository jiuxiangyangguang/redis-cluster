function timeout (time){
  return new Promise((resolve, reject) =>{
    setTimeout(resolve,time)
  })
}

class Task {
  constructor(num=2){
    this.num = num
    this.list = []
    this.cur = 0
  }

  add(fun){
    return new Promise((rosovl)=>{
      this.list.push({
        f: fun,
        r: rosovl
      })
      this.run() 
    })
  }
  
  run(){
    while(this.list.length && this.cur < this.num){
      const task = this.list.shift()
      this.cur++
      task.f().then(()=>{
        this.cur--
        task.r()
        this.run()
      })
    }
  }
}



const superTask = new Task()

function addTask (time,name){
  superTask.add(()=>timeout(time)).then(()=>{
    console.log(`任务${name}完成`)
  })
}

addTask(10000,1)
addTask(5000,2)
addTask(3000,3)
addTask(4000,4)
addTask(5000,5)