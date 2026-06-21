/* sfx.js — shared sound helper for SuperTouch arcade games
 * Assumes audio files live at  fx/  relative to the page.
 * Usage:  SFX.good()  SFX.bad()  SFX.hurry()  SFX.over()  SFX.ui()
 */
(function (global) {
  'use strict';

  var _cache = {};

  function _get(name, src) {
    if (!_cache[name]) {
      var a = new Audio(src);
      a.preload = 'auto';
      _cache[name] = a;
    }
    return _cache[name];
  }

  function _play(name, src, volume) {
    var a = _get(name, src);
    a.volume = (volume !== undefined) ? volume : 1.0;
    a.currentTime = 0;
    a.play().catch(function () {}); // swallow autoplay policy errors
  }

  global.SFX = {
    /** Correct answer / piece removed / good match */
    good:  function () { _play('good',  'fx/correct-sound.mp3'); },
    /** Wrong click / mismatch / error */
    bad:   function () { _play('bad',   'fx/wrong-sound.mp3');   },
    /** Timer entering danger zone (turns red) */
    hurry: function () { _play('hurry', 'fx/FF7-boost.mp3');     },
    /** Game over (loss or end of game) */
    over:  function () { _play('over',  'fx/FF7-gameover.mp3');  },
    /** UI click — menu tile, main-menu button */
    ui:    function () { _play('ui',    'fx/correct-sound.mp3', 0.6); }
  };

}(window));
