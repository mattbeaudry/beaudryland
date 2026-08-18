import * as globals from "./globals";

import { Utility } from "./utility";
import { Achievement } from "./achievement";
var blUtil = new Utility();
var blAchievement = new Achievement();

export class Inventory {
  constructor() {
    this.invslothtml = "";
    this.inventorySlots = globals.inventoryslots;
    this.inventoryDiv = ".the-fucking-inventory";
  }

  setupInventorySlots() {
    // console.log(this.inventorySlots);
    this.invslothtml += '<div class="slot-1 empty selected-item" data-blocktype="empty">0</div>';
    for (var i = 1; i <= this.inventorySlots; i += 1) {
      this.invslothtml += '<div class="slot-' + i + ' empty" data-blocktype="empty">0</div>';
    }
    document.querySelector(".the-fucking-inventory").innerHTML = this.invslothtml;
    // TODO: replace jQuery UI sortable with native drag-and-drop
  }

  addToInventory(blocktype, quantitytoadd) {
    if (!quantitytoadd) {
      quantitytoadd == "1";
    }
    quantitytoadd = parseInt(quantitytoadd);
    var slotwithsameitemEl = document.querySelector(".the-fucking-inventory > .block-" + blocktype);
    var invChildren = [...document.querySelector(".the-fucking-inventory").children];
    var slotwithsameitem = slotwithsameitemEl ? invChildren.indexOf(slotwithsameitemEl) : -1;
    // add to slot with matching item
    if (slotwithsameitem != -1) {
      blUtil.log("adding " + quantitytoadd + " " + blocktype + " to stack in inv.");
      var slotEl = document.querySelectorAll(".the-fucking-inventory > div")[slotwithsameitem];
      var quantity = parseInt(slotEl.innerHTML) + quantitytoadd;
      slotEl.innerHTML = quantity;
      // add to empty slot
    } else {
      blUtil.log("adding " + quantitytoadd + " " + blocktype + " to empty slot in inv.");
      var firstEmpty = document.querySelector(".the-fucking-inventory > .empty");
      if (firstEmpty) {
        firstEmpty.classList.add("block", "block-" + blocktype);
        firstEmpty.setAttribute("data-blocktype", blocktype);
        firstEmpty.setAttribute("title", blocktype);
        firstEmpty.innerHTML = quantitytoadd;
        firstEmpty.classList.remove("empty");
      }
    }
  }

  removeFromInventory(blocktype) {
    //minus one item from stack
    var slotEl = document.querySelector(".the-fucking-inventory > .block-" + blocktype);
    if (!slotEl) return;
    var quantity = parseInt(slotEl.innerHTML) - 1;
    slotEl.innerHTML = quantity;
    //empty slot if stack runs out for items
    if (quantity == 0) {
      slotEl.classList.add("empty");
      slotEl.setAttribute("data-blocktype", "empty");
      slotEl.setAttribute("title", "empty");
      slotEl.classList.remove("block", "block-" + blocktype);
    }
  }

  moveItemToCraftingTable(blocktype) {
    var slot1 = document.querySelector(".the-fucking-crafting-table > .slot-1");
    var slot2 = document.querySelector(".the-fucking-crafting-table > .slot-2");
    var slot3 = document.querySelector(".the-fucking-crafting-table > .slot-3");
    if (slot1 && slot1.classList.contains("empty")) {
      slot1.classList.add("block-" + blocktype);
      slot1.classList.remove("empty");
      slot1.setAttribute("data-blocktype", blocktype);
      slot1.setAttribute("title", blocktype);
      slot1.innerHTML = "1";
      this.removeFromInventory(blocktype);
    } else if (slot2 && slot2.classList.contains("empty")) {
      slot2.classList.add("block-" + blocktype);
      slot2.classList.remove("empty");
      slot2.setAttribute("data-blocktype", blocktype);
      slot2.setAttribute("title", blocktype);
      slot2.innerHTML = "1";
      this.removeFromInventory(blocktype);
    } else if (slot3 && slot3.classList.contains("empty")) {
      slot3.classList.add("block-" + blocktype);
      slot3.classList.remove("empty");
      slot3.setAttribute("data-blocktype", blocktype);
      slot3.setAttribute("title", blocktype);
      slot3.innerHTML = "1";
      this.removeFromInventory(blocktype);
    }
    this.checkCraftingTableForItem();
  }

  removeAllItemsFromCraftingTable() {
    [...document.querySelectorAll(".the-fucking-crafting-table > div")].forEach(function(el) {
      el.className = el.className.replace(new RegExp('\\b' + globals.allblockclasses().trim().split(' ').join('\\b|\\b') + '\\b', 'g'), '').trim();
      el.setAttribute("data-blocktype", "empty");
      el.setAttribute("title", "empty");
      el.classList.add("empty");
      el.innerHTML = "0";
    });
  }

  createCraftedItem(blocktype, amount) {
    if (amount == null) {
      amount = 1;
    }
    var slotEl = document.querySelector(".the-fucking-crafted-item > .slot");
    slotEl.classList.add("block", "block-" + blocktype);
    slotEl.setAttribute("data-blocktype", blocktype);
    slotEl.setAttribute("title", blocktype);
    slotEl.classList.remove("empty");
    slotEl.innerHTML = amount;
    blAchievement.updateStats();
  }

  checkCraftingTableForItem() {
    blUtil.log("Check for Craftable Item");
    var slot1type = document.querySelector(".the-fucking-crafting-table > .slot-1").getAttribute("data-blocktype");
    var slot2type = document.querySelector(".the-fucking-crafting-table > .slot-2").getAttribute("data-blocktype");
    var slot3type = document.querySelector(".the-fucking-crafting-table > .slot-3").getAttribute("data-blocktype");
    var recipe = slot1type + slot2type + slot3type;

    switch (recipe) {
      case "treeemptyempty":
        this.createCraftedItem("wood", 3);
        break;
      case "treetreeempty":
        this.createCraftedItem("wood", 6);
        break;
      case "treetreetree":
        this.createCraftedItem("wood", 10);
        break;
      case "rockwoodwood":
        this.createCraftedItem("shovel", 1);
        break;
      case "rockrockwood":
        this.createCraftedItem("sword", 1);
        break;
      case "woodwoodrock":
        this.createCraftedItem("fire", 10);
        break;
      case "woodwoodwood":
        this.createCraftedItem("door", 10);
        break;

      case "treewoodwood":
        this.createCraftedItem("guitar", 1);
        break;
      case "treewoodsilver":
        this.createCraftedItem("piano", 1);
        break;
      case "treegoldgold":
        this.createCraftedItem("trumpet", 1);
        break;
      case "treediamonddiamond":
        this.createCraftedItem("bass", 1);
        break;
      case "treesilvergold":
        this.createCraftedItem("microphone", 1);
        break;
      case "palmtreepalmwoodpalmtree":
        this.createCraftedItem("drumsticks", 1);
        break;

      case "woodwooddiamond":
        this.createCraftedItem("frisbee", 1);
        break;
      case "treewooddiamond":
        this.createCraftedItem("bike", 1);
        break;
      case "treetreediamond":
        this.createCraftedItem("skiis", 1);
        break;
      case "woodtreewood":
        this.createCraftedItem("canoe", 1);
        break;
      case "woodtreeoil":
        this.createCraftedItem("car", 1);
        break;
      case "clayrockclay":
        this.createCraftedItem("road", 10);
        break;
      case "rockrockrock":
        this.createCraftedItem("rockbrick", 10);
        break;
      case "icerockicerockicerock":
        this.createCraftedItem("icerockbrick", 10);
        break;
      case "sandstonesandstonesandstone":
        this.createCraftedItem("sandstonebrick", 10);
        break;
      case "clayclayclay":
        this.createCraftedItem("claybrick", 10);
        break;
      case "treetreesilver":
        this.createCraftedItem("spear", 1);
        break;
      case "woodwoodtree":
        this.createCraftedItem("sign", 5);
        break;
      case "rockrocktree":
        this.createCraftedItem("axe", 1);
        break;
      case "silveroilfire":
        this.createCraftedItem("rocket", 1);
        break;

      case "treepinetreetree":
        this.createCraftedItem("table", 5);
        break;
      case "pinetreewoodwood":
        this.createCraftedItem("chair", 5);
        break;
      case "pinetreepalmpinetree":
        this.createCraftedItem("bed", 5);
        break;
      case "woodpinetreewood":
        this.createCraftedItem("chest", 5);
        break;
      case "diamondsilvergold":
        this.createCraftedItem("telescope", 1);
        break;
      case "diamondsilverdiamond":
        this.createCraftedItem("computer", 1);
        break;

      case "pinetreeemptyempty":
        this.createCraftedItem("pinewood", 3);
        break;
      case "pinetreepinetreeempty":
        this.createCraftedItem("pinewood", 6);
        break;
      case "pinetreepinetreepinetree":
        this.createCraftedItem("pinewood", 10);
        break;
      case "palmtreeemptyempty":
        this.createCraftedItem("palmwood", 3);
        break;
      case "palmtreepalmtreeempty":
        this.createCraftedItem("palmwood", 5);
        break;
      case "palmtreepalmtreepalmtree":
        this.createCraftedItem("palmwood", 10);
        break;
      case "appletreeemptyempty":
        this.createCraftedItem("applewood", 3);
        break;
      case "appletreeappletreeempty":
        this.createCraftedItem("applewood", 6);
        break;
      case "appletreeappletreeappletree":
        this.createCraftedItem("applewood", 10);
        break;
      case "palmtreepalmtreewood":
        this.createCraftedItem("bow", 1);
        break;
      case "woodpalmtreepalmtree":
        this.createCraftedItem("arrow", 1);
        break;
      case "silversilversilver":
        this.createCraftedItem("portala", 1);
        break;
      case "goldgoldgold":
        this.createCraftedItem("portalb", 1);
        break;

      default: {
        var defaultSlot = document.querySelector(".the-fucking-crafted-item > .slot");
        defaultSlot.className = defaultSlot.className.replace(new RegExp('\\b' + globals.allblockclasses().trim().split(' ').join('\\b|\\b') + '\\b', 'g'), '').trim();
        defaultSlot.classList.add("empty");
        defaultSlot.setAttribute("data-blocktype", "empty");
        defaultSlot.setAttribute("title", "empty");
        defaultSlot.innerHTML = "0";
      }
    }
  }
}
