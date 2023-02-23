function isVisible(hash){
  return window.location.hash == hash;
}

const Show={
  props:["hash"],
  data(){
    return{
      hashState:this.hash,
      classState:"search",
      visible:isVisible(this.hash)
    }
  },
  mounted(){
    const component = this;
    this.listener = function hashListenerACB(){
      component.visible = isVisible(component.hash);
    }
    window.addEventListener("hashchange", this.listener)
  },
  render(){

    const component = this;


    return(this.visible && component.$scopedSlots.default());
  },
  unmounted(){

    window.removeEventListener("hashchange", this.listener)

  }
}
export default Show;
