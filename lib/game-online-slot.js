'use babel';

import GameOnlineSlotView from './game-online-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  gameOnlineSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gameOnlineSlotView = new GameOnlineSlotView(state.gameOnlineSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gameOnlineSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'game-online-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gameOnlineSlotView.destroy();
  },

  serialize() {
    return {
      gameOnlineSlotViewState: this.gameOnlineSlotView.serialize()
    };
  },

  toggle() {
    console.log('GameOnlineSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
