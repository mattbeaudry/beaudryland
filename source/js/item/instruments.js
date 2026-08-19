import * as globals from '../globals';

export class Instruments {
	constructor() {}

	showMusicNote() {
		console.log('showMusicNote');
		var rid = globals.uniqueObjectID();
		var healthlabelhtml =
			'<div class="musical-note music-note-id-' + rid + ' block-musical-note"></div>';
		document.querySelector('.objectId-1').insertAdjacentHTML('beforeend', healthlabelhtml);

		var noteEl = document.querySelector('.music-note-id-' + rid);
		if (noteEl) noteEl.classList.add('musical-note-animate');

		setTimeout(() => {
			console.log('remove note');
			var el = document.querySelector('.music-note-id-' + rid);
			if (el) el.remove();
		}, 300);
	}
}
