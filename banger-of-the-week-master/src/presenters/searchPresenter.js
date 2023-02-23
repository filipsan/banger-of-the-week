import SearchFormView from "../views/searchFormView.js";
import {knownTypes} from "../utilities.js"
import SearchResultsView from "../views/searchResultsView.js"
import PromiseNoData from "../views/promiseNoData.js"
import resolvePromise from "../resolvePromise.js"
import {searchDishes} from "../dishSource.js"

const Search={
  props: ["model"],
  data(){
    return{
      promiseState: {},
      searchParams:{}
  }},
  created(){
    const component=this;
    resolvePromise(searchDishes(component.searchParams), component.promiseState);
  },
  render(){
    const component=this;

    function onInputChangeACB(input){
      component.searchParams.query=input;
      //component.model.SetSearchQuery(input)
    }
    function onFormChangeACB(value){
      component.searchParams.type=value;
      //component.model.setSearchType(value)
    }
    function renderSearchResultsACB(){
      resolvePromise(searchDishes(component.searchParams), component.promiseState);

    }
    function onFormClickACB(){
      renderSearchResultsACB()

    }
    function changeHashACB(hash){
      window.location.hash = hash
    }
    function changeCurrentDishACB(value){
      component.model.setCurrentDish(value.id)
    }
    function changeHashACB(hash){
      window.location.hash = hash
    }
    return(
      <div>
      <SearchFormView changeHash={changeHashACB} dishTypeOptions={["starter", "main course", "dessert"]} onInputChange={onInputChangeACB} onFormChange={onFormChangeACB} onFormClick={onFormClickACB}/>
      {PromiseNoData(component.promiseState) ||
      <SearchResultsView searchResults={component.promiseState.data} handleClick={changeCurrentDishACB}/>}
      </div>
    )
  }
};
export default Search
