<template>
    <div class="box">
      <div class="center-container">
        <div id="emoji" class="emoji-display" v-cloak>
          <div class="chat-box">
            <div :key="messageItem.id" v-for="messageItem in chatMessageList" class="chat-line">
              <cite class="line-name">{{  messageItem.name  }}</cite>
              <span class="line-content" v-html="messageItem.content"></span>
            </div>
          </div>
          <div class="input-panel">
            <div class="input-media">
              <em @click="toggleEmojiBox" class="emoji-button">
                <img :src="'http://ysclass.net/a/img/avatar.9be9381e.svg'" />
              </em>
            </div>
            <div ref="inputBox" @click="handleBoxClick" class="input-box" enterkeyhint="send" contenteditable="true">
            </div>
            <div class="input-control">
              <button @click="doSend" class="send-button" type="button">
                发送
              </button>
            </div>
          </div>
          <div v-show="isVisible" class="emoji-box">
            <span @click="insertEmoji(item)" v-for="item in emojiList" :key="item" class="emoji-item">
              <img :src="item.path" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  let rangeOfInputBox = null
  export default {
    data() {
      return {
        count: 1,
        isVisible: false,
        emojiList: [
          {
            path: "https://ali.oss.sh.ysclass.net//upload/192/3a78ed8c45254394bbb15e4dfc79c5d2.png",
          }
        ],
        chatMessageList: [],
      }
    },
    methods: {
      handleBoxClick(event) {
        let target = event.target;
        this.setCaretForEmoji(target);
      },
      setCaretForEmoji(target) {
        if (target.tagName.toLowerCase() === "img") {
          let range = new Range();
          range.setStartBefore(target);
          range.collapse(true);
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(range);
        }
      },
      toggleEmojiBox() {
        this.isVisible = !this.isVisible;
      },
      insertEmoji(item) {
        let emojiEl = document.createElement("img");
        emojiEl.setAttribute('class', 'emoji-image')
        emojiEl.width = 24
        emojiEl.height = 24
        emojiEl.src = item.path
  
        if (!rangeOfInputBox) {
          rangeOfInputBox = new Range();
          rangeOfInputBox.selectNodeContents(this.$refs.inputBox);
        }
  
        if (rangeOfInputBox.collapsed) {
          rangeOfInputBox.insertNode(emojiEl);
        } else {
          rangeOfInputBox.deleteContents();
          rangeOfInputBox.insertNode(emojiEl);
        }
        rangeOfInputBox.collapse(false);
      },
      doSend() {
        let content = this.$refs.inputBox.innerHTML
  
        if (content !== "") {
          let name = "我";
          let messageItem = {
            id: this.count++,
            name,
            content
          };
          this.chatMessageList.push(messageItem);
          this.$refs.inputBox.innerHTML = "";
        }
      }
    },
    mounted() {
      document.onselectionchange = () => {
        let selection = document.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (this.$refs.inputBox.contains(range.commonAncestorContainer)) {
            rangeOfInputBox = range;
          }
        }
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .zh {
    width: 1200px;
    height: 700px;
    border: 1px solid #c0c0c0;
  }
  
  
  .center-container {
    width: 360px;
    margin: 15px auto;
    padding: 15px;
    border: 1px dotted #369;
  }
  
  .chat-box {
    min-height: 40px;
    max-height: 300px;
    margin-bottom: 30px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #ececec;
    overflow: auto;
    line-height: 1.6;
  }
  
  .input-panel {
    display: flex;
  
    .input-media {
      padding: 0 10px;
      color: #666;
      font-size: 24px;
      align-self: flex-end;
      line-height: 1;
    }
  
    .emoji-button {
      display: block;
      img {
        width: 12px;
        height: 12px;
      }
    }
  
    .input-main {
      flex: 1;
      align-self: flex-end;
  
      >.form-input {
        width: 100%;
        padding: 5px 10px;
        box-sizing: border-box;
        color: #333;
        border: 0 none;
        border-bottom: 1px solid #ccc;
        outline: none;
        font-size: 14px;
      }
    }
  
    .input-box {
      flex: 1;
      padding: 5px 10px 0 10px;
      border-bottom: 1px solid #ccc;
      outline: none;
      font-size: 14px;
      line-height: normal;
  
    }
  
    .input-control {
      padding: 0 0 0 10px;
      align-self: flex-end;
    }
  
    .send-button {
      display: block;
      padding: 8px 20px;
      border-radius: 4px;
      border: 0 none;
      background: #3298dc;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      outline: none;
  
      &:hover {
        background: #2793da;
      }
    }
  }
  
  .emoji-box {
    margin-top: 10px;
    padding: 10px;
    border: 1px dashed #773;
    border-radius: 4px;
  }
  
  .emoji-item {
    display: inline-block;
    padding: 5px;
    border: 1px dotted transparent;
    line-height: 1;
    cursor: pointer;
  
    &:hover {
      border-color: #786;
    }
  
    img {
      width: 24px;
      height: 24px;
    }
  }
  
  .chat-line {
    font-size: 12px;
  }
  
  .line-name {
    color: #777;
    font-style: normal;
  
    &::after {
      content: ": ";
    }
  }
  
  .line-content {
    color: #333;
  
    >img {
      width: 16px;
      vertical-align: text-bottom;
    }
  }
  </style>