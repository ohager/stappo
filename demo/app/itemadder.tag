<itemadder>
    <div class="c-input-group">
	    <button class="c-button c-button--brand" onclick={clear}>Clear All</button>
        <div class="o-field">
            <input ref="item" class="c-field u-xlarge" placeholder="Enter name of item to add...">
        </div>
        <button class="c-button c-button--brand" onclick={add}>Add</button>
    </div>
    <script>
        var deepClone = require('deep-clone')

        add(e){
            // need to copy the state, as it is immutable
	        var items = deepClone(stappo.get().items || []);
	        items.push({text: this.refs.item.value});
            // now, just reset the items state!
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