import * as globals from '../globals';

export class Instruments {
	constructor() {
  
	}

    showMusicNote() {
        console.log("showMusicNote")
		var rid = globals.uniqueObjectID();
		var healthlabelhtml = '<div class="musical-note music-note-id-'+rid+' block-musical-note"></div>';
		$('.objectId-1').append(healthlabelhtml);
        
        $('.musical-note-id-'+rid).addClass("musical-note-animate");

        setTimeout(() => {
            console.log("remove note");
            $('.musical-note-id-'+rid).remove();
        }, 300);
	}

};