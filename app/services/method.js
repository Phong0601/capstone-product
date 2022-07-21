function Services(){
    this.getListProductApi=function(){
        return axios({
            url:"https://62c813c70f32635590d0d352.mockapi.io/product",
            method:"GET",
        })
    }
    .then(function(result){})
}
