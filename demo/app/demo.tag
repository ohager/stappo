<demo>
	<githubribbon url="https://github.com/ohager/stappo" />
	<div class="o-container o-container--large c-text">
		<h2 class="c-heading">Stappo Demo</h2>
		<small >This small demo is built with RiotJS, BlazeCSS and Webpack</small>
		<div class="o-grid u-letter-box--medium">
			<div class="o-grid__cell o-grid__cell--width-66">
				<itemadder/>
				<itemlist/>
			</div>
			<div class="o-grid__cell">
				<searchbar/>
				<br/>
				<stappostats />
			</div>
		</div>
	</div>
	<script>
		require('./githubribbon.tag')
		require('./itemadder.tag')
		require('./itemlist.tag')
		require('./searchbar.tag')
		require('./stappostats.tag')
	</script>
</demo>
