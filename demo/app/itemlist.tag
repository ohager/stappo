<itemlist class="u-letter-box--medium">
	<h2>Your items</h2>
	<item each={items} text={text} />

	<span if={items.length == 0} class="c-text--quiet u-absolute-center">No Items Here</span>

	<script>
		require("./item.tag")

		this.items = []

		stappo.listen( s => {
			const regexp = new RegExp(s.query,"i")
			this.items = s.query ? s.items.filter( i => regexp.test(i.text) ) : s.items
			this.update()
		} )
	</script>

</itemlist>