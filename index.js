let rce = React.createElement.bind()

let JSON_CALLBACK = function(res){
    let inputTag = document.getElementById('dataInput')
    inputTag.value = JSON.stringify(res.query.search)
    let buttonTag = document.getElementById('dataButton')
    buttonTag.click()
    
} 
            
let myTop = React.createClass({
    getInitialState: function(){
      return {
          svalue: ''
      }  
    },
    svalueHandler: function(e){
      this.setState({svalue: e.target.value})  
    },
    search: function(){
        let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + this.state.svalue + '&callback=JSON_CALLBACK'
        let scriptTag = document.createElement('script')
        scriptTag.setAttribute('src', url)
        document.body.appendChild(scriptTag)
    },
    render: function(){
        return (
            rce('div', null, 
                rce('div', {'className': 'form-group'},
                    rce('div', {'className': 'col-xs-12'},
                        rce('a', {'href': 'https://en.wikipedia.org/wiki/Special:Random', 'target': '_blank'}, 'Click here for a random article ')
                    ),
                    rce('div', {'className': 'col-xs-8'},
                        rce('input', {'type': 'text', 'className': 'form-control', 'value': this.state.svalue, 'onChange': this.svalueHandler})
                    ),
                    rce('div', {'className': 'col-xs-4'},
                        rce('button', {'type': 'button', 'className': 'btn btn-primary', 'onClick': this.search}, 'search')
                    )
                    
                )
            )
            
        )
    }
})

let myList = React.createClass({
    getInitialState: function(){
        return{
            
        }  
    },
    newPage: function(e){
        let target = e.target
        while(target.tagName !== 'DIV'){
            target = target.parentNode
        }
        let title = target.attributes['data-title'].value
        window.open('https://en.wikipedia.org/wiki/'+title)
    },
    render: function(){
        let data = this.props.data
        let list = data.map((value, index) => {
            return rce('div', {'className': 'item', 'key': 'listitem' + index, 'onClick': this.newPage, 'data-title': value.title},
                rce('p', {'className': 'title'},
                    rce('b', null, value.title)
                ),
                rce('p', {'className': 'snip', 'dangerouslySetInnerHTML': {'__html': value.snippet}})
            )
        })
        return (
            rce('div', null,
                rce('div', null, '.'),
                list
            )
        )
    }
})

let total = React.createClass({
    getInitialState: function(){
        return{
            data: []
        }
    },
    dataHandler: function(e){
        let inputTag = document.getElementById('dataInput')
        let data = JSON.parse(inputTag.value)
        this.setState({data: data})
    },
    render: function(){
        return (
            rce('div', null,
                rce('input', {'onChange': this.dataHandler, 'id': 'dataInput', 'style': {'display': 'none'}}),
                rce('button', {'onClick': this.dataHandler, 'id': 'dataButton', 'style': {'display': 'none'}}),
                rce(myTop, null),
                rce(myList, {'data': this.state.data})
            )
        )
    }
})

ReactDOM.render(rce(total,null), document.getElementById('container'))