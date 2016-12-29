<itemlist class="u-letter-box--medium">
	<h2>Your items</h2>
	<item each={items} text={text} />
	<script>
		require("./item.tag")

		this.items = []

		stappo.listen( s => {
			this.items = s.items;
		} )
	</script>
</itemlist>