<searchbar>
	<div class="c-card">
		<div class="c-card__item">
			<div class="o-field">
				<input ref="search" class="c-field u-large" placeholder="What are you searching for?" onkeyup={search}>
			</div>
		</div>
	</div>
	<script>
		search(e)
		{
			stappo.update( () => ({query: this.refs.search.value}) );
		}
	</script>
</searchbar>