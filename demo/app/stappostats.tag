<stappostats>
	<div class="c-card">
		<div class="c-card__item c-card__item--divider">Stappo Stats</div>
		<div class="c-card__item">
			<table class="c-table c-table--condensed">
				<caption class="c-table__caption"><a href="https://www.npmjs.com/package/stappo"><img src="https://img.shields.io/npm/v/stappo.svg"/></a></caption>
				<thead class="c-table__head">
				<tr class="c-table__row c-table__row--heading">
					<th class="c-table__cell">Build Type</th>
					<th class="c-table__cell">Size [bytes]</th>
				</tr>
				</thead>
				<tbody class="c-table__body">
				<tr class="c-table__row">
					<td class="c-table__cell"><a href={stats.genericbundle.url} >Generic Bundle</a></td>
					<td class="c-table__cell">{stats.genericbundle.size}</td>
				</tr>
				<tr class="c-table__row">
					<td class="c-table__cell"><a href={stats.webbundle.url} >Web Bundle</a></td>
					<td class="c-table__cell">{stats.webbundle.size}</td>
				</tr>
				<tr class="c-table__row">
					<td class="c-table__cell"><a href={stats.generic.url} >Generic</a></td>
					<td class="c-table__cell">{stats.generic.size}</td>
				</tr>
				<tr class="c-table__row">
					<td class="c-table__cell"><a href={stats.web.url} >Web</a></td>
					<td class="c-table__cell">{stats.web.size}</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>

	<script>
		const loading = 'loading...';
		const githubSourceUrl = 'https://raw.githubusercontent.com/ohager/stappo/master/';

		this.stats = {
			genericbundle :{
				url: `${githubSourceUrl}/dist/stappo.bundle.js`,
				size : loading
			},
			webbundle :{
				url: `${githubSourceUrl}/dist/stappo.web.bundle.js`,
				size : loading
			},
			generic :{
				url: `${githubSourceUrl}/dist/stappo.min.js`,
				size : loading
			},
			web :{
				url: `${githubSourceUrl}/dist/stappo.web.min.js`,
				size : loading
			}
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
			fetchSize(this.stats.genericbundle.url, size => {
				this.stats.genericbundle.size = size;
				this.update();
			})
			fetchSize(this.stats.webbundle.url, size => {
				this.stats.webbundle.size = size;
				this.update();
			})
			fetchSize(this.stats.generic.url, size => {
				this.stats.generic.size = size;
				this.update();
			})
			fetchSize(this.stats.web.url, size => {
				this.stats.web.size = size;
				this.update();
			})
		})
	</script>


</stappostats>