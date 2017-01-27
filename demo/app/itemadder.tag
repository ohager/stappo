<itemadder>
	<div class="c-input-group">
		<button class="c-button c-button--brand" onclick={clear}>Clear All</button>
		<div class="o-field">
			<input ref="item" class="c-field u-xlarge" placeholder="Enter name of item to add..." onkeypress={keypress}>
		</div>
		<button class="c-button c-button--brand" onclick={add}>Add</button>
	</div>
	<script>
		const deepClone = require('deep-clone')

		const updateItems = (state) =>
		{
			// need to copy the state, as it is immutable
			let items = deepClone(stappo.get().items || []);
			items.push({text: this.refs.item.value});
			return {items: items};
		}

		// ---- components functions
		keypress(e)
		{
			if(e.code === 'Enter'){
				e.preventDefault();
				this.add();
			}
		}

		add(e)
		{
			stappo.update(updateItems);

			this.refs.item.value = "";
			this.update();
		}

		clear(e)
		{
			stappo.update( () => {items: []} );
			this.refs.item.value = "";
			this.update();
		}
	</script>
</itemadder>