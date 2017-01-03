<stappostats>
	<div class="c-card">
		<div class="c-card__item c-card__item--divider">Stappo Stats</div>
		<div class="c-card__item">
			<table class="c-table c-table--condensed">
				<caption class="c-table__caption">Version {version}</caption>
				<thead class="c-table__head">
				<tr class="c-table__row c-table__row--heading">
					<th class="c-table__cell">Build Type</th>
					<th class="c-table__cell">Size [bytes]</th>
				</tr>
				</thead>
				<tbody class="c-table__body">
				<tr class="c-table__row">
					<td class="c-table__cell">Generic Bundle</td>
					<td class="c-table__cell">{sizes.genericbundle}</td>
				</tr>
				<tr class="c-table__row">
					<td class="c-table__cell">Generic Raw</td>
					<td class="c-table__cell">{sizes.generic}</td>
				</tr>
				<tr class="c-table__row">
					<td class="c-table__cell">Web Bundle</td>
					<td class="c-table__cell">{sizes.webbundle}</td>
				</tr>
				<tr class="c-table__row">
					<td class="c-table__cell">Web Raw</td>
					<td class="c-table__cell">{sizes.web}</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>


	<script>
		const loading = 'loading...';
		this.version = '0.0.1-alpha';
		this.sizes = {
			genericbundle : loading,
			generic : loading,
			webbundle : loading,
			web: loading
		}

		function fetchSize(url, callback){
			var oReq = new XMLHttpRequest();
			oReq.addEventListener("load", function() {
				callback(this.responseText.length);
			});
			oReq.open("GET", url);
			oReq.send();
		}

		this.on('mount', () => {
			fetchSize('https://raw.githubusercontent.com/ohager/stappo/master/dist/stappo.web.min.js', size => {
				this.sizes.web = size;
				this.update();
			})
			fetchSize('https://raw.githubusercontent.com/ohager/stappo/master/dist/stappo.web.bundle.js', size => {
				this.sizes.webbundle = size;
				this.update();
			})
			fetchSize('https://raw.githubusercontent.com/ohager/stappo/master/dist/stappo.min.js', size => {
				this.sizes.generic = size;
				this.update();
			})
			fetchSize('https://raw.githubusercontent.com/ohager/stappo/master/dist/stappo.bundle.js', size => {
				this.sizes.genericbundle = size;
				this.update();
			})
		})
	</script>


</stappostats>