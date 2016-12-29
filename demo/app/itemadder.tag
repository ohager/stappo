<itemadder>
    <div class="c-input-group">
	    <button class="c-button c-button--brand" onclick={clear}>Clear All</button>
        <div class="o-field">
            <input ref="item" class="c-field u-xlarge" placeholder="Enter name of item to add...">
        </div>
        <button class="c-button c-button--brand" onclick={add}>Add</button>
    </div>
    <script>
        add(e){
	        var items = _.cloneDeep(stappo.get().items || []);
	        items.push({text: this.refs.item.value});
	        stappo.update({items: items});

	        this.refs.item.value = "";
	        this.update();
        }

        clear(e){
	        stappo.update( {items: []} );
	        this.refs.item.value = "";
	        this.update();
        }
    </script>
</itemadder>