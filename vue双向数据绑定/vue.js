class Vue { 
  constructor(obj_instance){
    this.$data = obj_instance.data
    console.log('this.$data', this.$data)
  }
}