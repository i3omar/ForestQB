<template>
  <div class="botui botui-container" v-botui-container>
    <div class="botui-messages-container">
      <div v-for="msg in messages" :key="msg.id" class="botui-message"
        :class="[{ human: msg.human, bot: !msg.human }, msg.cssClass]" v-botui-scroll>
        <transition name="slide-fade">
          <div v-if="msg.visible" :class="[
            { human: msg.human, 'botui-message-content': true },
            msg.type,
          ]">
            <span v-if="msg.type == 'text'" v-text="msg.content" v-botui-markdown></span>
            <iframe v-if="msg.type == 'embed'" :src="msg.content" frameborder="0" allowfullscreen
              scrolling="no"></iframe>
          </div>
        </transition>
        <div v-if="msg.loading" class="botui-message-content loading">
          <i class="dot"></i>
          <i class="dot"></i>
          <i class="dot"></i>
        </div>
      </div>
    </div>
    <div class="botui-actions-container">
      <transition name="slide-fade">
        <div v-if="action.show" v-botui-scroll>
          <form v-if="action.type == 'text'" class="botui-actions-text" @submit.prevent="handle_action_text()"
            :class="action.cssClass">
            <i v-if="action.text.icon" class="botui-icon botui-action-text-icon fa"
              :class="'fa-' + action.text.icon"></i>
            <input ref="input" :type="action.text.sub_type" accept="image/*" capture="camera"
              v-model="action.text.value" class="botui-actions-text-input" :placeholder="action.text.placeholder"
              :size="action.text.size" :class="action.text.cssClass" required v-focus />
            <button type="submit" :class="{
              'botui-actions-buttons-button': !!action.text.button,
              'botui-actions-text-submit': !action.text.button,
            }">
              <i v-if="action.text.button && action.text.button.icon" class="botui-icon botui-action-button-icon fa"
                :class="'fa-' + action.text.button.icon"></i>
              <span>{{
                (action.text.button && action.text.button.label) || "Go"
              }}</span>
            </button>
          </form>
          <form v-if="action.type == 'select'" class="botui-actions-select" @submit.prevent="handle_action_select()"
            :class="action.cssClass">
            <i v-if="action.select.icon" class="botui-icon botui-action-select-icon fa"
              :class="'fa-' + action.select.icon">
            </i>
            <v-select v-if="action.select.searchselect && !action.select.multipleselect" v-model="action.select.value"
              :value="action.select.value" :placeholder="action.select.placeholder"
              class="botui-actions-text-searchselect" :label="action.select.label"
              :options="action.select.options"></v-select>
            <v-select v-else-if="
              action.select.searchselect && action.select.multipleselect
            " multiple v-model="action.select.value" :value="action.select.value"
              :placeholder="action.select.placeholder" class="botui-actions-text-searchselect"
              :label="action.select.label" :options="action.select.options"></v-select>
            <select v-else v-model="action.select.value" class="botui-actions-text-select"
              :placeholder="action.select.placeholder" :size="action.select.size" :class="action.select.cssClass"
              required v-focus>
              <option v-for="option in action.select.options" :class="action.select.optionClass" :key="option.value"
                v-bind:value="option.value" :disabled="option.value == '' ? true : false" :selected="action.select.value == option.value ? 'selected' : ''
                  ">
                {{ option.text }}
              </option>
            </select>
            <button type="submit" :class="{
              'botui-actions-buttons-button': !!action.select.button,
              'botui-actions-select-submit': !action.select.button,
            }">
              <i v-if="action.select.button && action.select.button.icon" class="botui-icon botui-action-button-icon fa"
                :class="'fa-' + action.select.button.icon"></i>
              <span>{{
                (action.select.button && action.select.button.label) || "Ok"
              }}</span>
            </button>
          </form>
          <div v-if="action.type == 'button'" class="botui-actions-buttons" :class="action.cssClass">
            <button type="button" :class="[
              button.icon ? 'botui-actions-buttons-button-icon' : '',
              button.cssClass,
            ]" class="botui-actions-buttons-button" v-for="(button, idx) in action.button.buttons" :key="idx"
              @click="handle_action_button(button)" autofocus>
              <i v-if="button.icon" class="botui-icon botui-action-button-icon fa" :class="'fa-' + button.icon"
                :style="'background-image:url(' + button.icon + ')'"></i>
              {{ button.text }}
            </button>
          </div>
          <form v-if="action.type == 'buttontext'" class="botui-actions-text" @submit.prevent="handle_action_text()"
            :class="action.cssClass">
            <i v-if="action.text.icon" class="botui-icon botui-action-text-icon fa"
              :class="'fa-' + action.text.icon"></i>
            <input ref="input" :type="action.text.sub_type" v-model="action.text.value" class="botui-actions-text-input"
              :placeholder="action.text.placeholder" :size="action.text.size" :class="action.text.cssClass" required
              v-focus />
            <button type="submit" :class="{
              'botui-actions-buttons-button': !!action.text.button,
              'botui-actions-text-submit': !action.text.button,
            }">
              <i v-if="action.text.button && action.text.button.icon" class="botui-icon botui-action-button-icon fa"
                :class="'fa-' + action.text.button.icon"></i>
              <span>{{
                (action.text.button && action.text.button.label) || "Go"
              }}</span>
            </button>
            <div class="botui-actions-buttons" :class="action.cssClass">
              <button type="button" :class="button.cssClass" class="botui-actions-buttons-button"
                v-for="(button, idx) in action.button.buttons" :key="idx" @click="handle_action_button(button)"
                autofocus>
                <i v-if="button.icon" class="botui-icon botui-action-button-icon fa" :class="'fa-' + button.icon"></i>
                {{ button.text }}
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/*eslint no-useless-escape: "off"*/
var _instance, // current vue instance.
  _options = {
    debug: false,
    fontawesome: false,
    searchselect: false,
  },
  _container, // the outermost Element. Needed to scroll to bottom, for now.
  _interface = {}, // methods returned by a BotUI() instance.
  _actionResolve,
  _markDownRegex = {
    icon: /!\(([^\)]+)\)/gim, // !(icon)
    image: /!\[(.*?)\]\((.*?)\)/gim, // ![alternate text](src)
    link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/gim, // [text](link) ^ can be added at end to set the target as 'blank'
    audio: /!\(([^\)]+\.mp3)\)/gim, // !(audio.mp3)
    emphasis: /\*([^\*]+)\*/gim, // *emphasis*
    strong: /\*\*([^\*]+)\*\*/gim, // **strong emphasis**
    br: /\n\n/gim,
  },
  _fontAwesome = "https://use.fontawesome.com/ea731dcb6f.js";

function _linkReplacer(match, $1, $2, $3) {
  var _target = $3 ? "blank" : ""; // check if '^' sign is present with link syntax
  return (
    "<a class='botui-message-content-link' target='" +
    _target +
    "' href='" +
    $2 +
    "'>" +
    $1 +
    "</a>"
  );
}

function _parseMarkDown(text) {
  return text
    .replace(
      _markDownRegex.audio,
      "<audio autoplay class='botui-message-content-audio' src='$1'></audio>"
    )
    .replace(
      _markDownRegex.image,
      "<img class='botui-message-content-image' src='$2' alt='$1' />"
    )
    .replace(
      _markDownRegex.icon,
      "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>"
    )
    .replace(_markDownRegex.link, _linkReplacer)
    .replace(_markDownRegex.emphasis, "<em>$1</em>")
    .replace(_markDownRegex.strong, "<strong>$1</strong>")
    .replace(_markDownRegex.br, "<br/><br/>");
}

function loadScript(src, cb) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;

  if (cb) {
    script.onload = cb;
  }

  document.body.appendChild(script);
}

function _handleAction(text) {
  if (_instance.action.addMessage) {
    _interface.message.human({
      delay: 100,
      content: text,
    });
  }
  _instance.action.show = !_instance.action.autoHide;
}

// import { Vuetify, VSelect } from "vuetify";
import { VSelect } from "vuetify";
// import axios from "axios";

export default {
  name: "BotUi",
  components: {
    // Vuetify,
    VSelect,
  },
  data: function () {
    return {
      action: {
        text: {
          size: 30,
          placeholder: "Write here ..",
        },
        button: {},
        show: false,
        type: "text",
        autoHide: true,
        addMessage: true,
      },
      messages: [],
    };
  },
  computed: {
    isMobile: function () {
      // return root.innerWidth && root.innerWidth <= 768;
      return window.innerWidth && window.innerWidth <= 768;
    },
  },
  methods: {
    handle_action_button: function (button) {
      _handleAction(button.text);
      var defaultActionObj = {
        type: "button",
        text: button.text,
        value: button.value,
      };

      for (var eachProperty in button) {
        if (Object.prototype.hasOwnProperty.call(button, eachProperty)) {
          if (
            eachProperty !== "type" &&
            eachProperty !== "text" &&
            eachProperty !== "value"
          ) {
            defaultActionObj[eachProperty] = button[eachProperty];
          }
        }
      }

      _actionResolve(defaultActionObj);
    },
    handle_action_text: function () {
      if (!this.action.text.value) return;
      _handleAction(this.action.text.value);
      _actionResolve({
        type: "text",
        value: this.action.text.value,
      });
      this.action.text.value = "";
    },
    handle_action_select: function () {
      if (
        this.action.select.searchselect &&
        !this.action.select.multipleselect
      ) {
        if (!this.action.select.value.value) return;
        _handleAction(this.action.select.value[this.action.select.label]);
        _actionResolve({
          type: "text",
          value: this.action.select.value.value,
          text: this.action.select.value.text,
          obj: this.action.select.value,
        });
      }
      if (
        this.action.select.searchselect &&
        this.action.select.multipleselect
      ) {
        if (!this.action.select.value) return;
        var values = new Array();
        var labels = new Array();
        for (var i = 0; i < this.action.select.value.length; i++) {
          values.push(this.action.select.value[i].value);
          labels.push(this.action.select.value[i][this.action.select.label]);
        }
        _handleAction(labels.join(", "));
        _actionResolve({
          type: "text",
          value: values.join(", "),
          text: labels.join(", "),
          obj: this.action.select.value,
        });
      } else {
        if (!this.action.select.value) return;
        for (var j = 0; j < this.action.select.options.length; j++) {
          // Find select title
          if (this.action.select.options[j].value == this.action.select.value) {
            _handleAction(this.action.select.options[j].text);
            _actionResolve({
              type: "text",
              value: this.action.select.value,
              text: this.action.select.options[j].text,
            });
          }
        }
      }
    },
  },
  directives: {
    "botui-markdown": function (el, binding) {
      if (binding.value == false || el.getAttribute("botui-markdown-done"))
        return; // v-botui-markdown="false"
      el.innerHTML = _parseMarkDown(el.textContent);
      el.setAttribute("botui-markdown-done", true); // mark the node as already parsed
    },
    "botui-scroll": {
      inserted: function () {
        console.log("botui-scroll");
        _container.scrollTop = _container.scrollHeight;
        setTimeout(() => {
          _container.scrollTop = _container.scrollHeight;
        }, 100);
      },
    },
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
    "botui-container": {
      inserted: function (el) {
        _container = el;
      },
    },
  },
  created: function () {
    _instance = this;
  },
};

function _addMessage(_msg) {
  if (!_msg.loading && !_msg.content) {
    throw Error(
      'BotUI: "content" is required in a non-loading message object.'
    );
  }

  _msg.type = _msg.type || "text";
  _msg.visible = _msg.delay || _msg.loading ? false : true;

  // 💡 Ensure a unique ID for each message
  if (!_msg.id) {
    // Use a timestamp + random number for uniqueness
    _msg.id = 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
  }

  var _index = _instance.messages.push(_msg) - 1;

  //logging
  if (_msg.content) {
    let sender = "Bot";
    if (_msg["human"]) {
      sender = "User";
    }
    // axios.post("./api/chatlog", {
    //   log: sender + ": " + JSON.stringify(_msg.content),
    // });
  }

  return new Promise(function (resolve) {
    setTimeout(function () {
      if (_msg.delay) {
        _msg.visible = true;

        if (_msg.loading) {
          _msg.loading = false;
        }
      }
      resolve(_index);
    }, _msg.delay || 0);
  });
}

function _checkOpts(_opts) {
  if (typeof _opts === "string") {
    _opts = {
      content: _opts,
    };
  }
  return _opts || {};
}

_interface.message = {
  add: function (addOpts) {
    return _addMessage(_checkOpts(addOpts));
  },
  bot: function (addOpts) {
    addOpts = _checkOpts(addOpts);
    return _addMessage(addOpts);
  },
  human: function (addOpts) {
    addOpts = _checkOpts(addOpts);
    addOpts.human = true;
    return _addMessage(addOpts);
  },
  get: function (index) {
    return Promise.resolve(_instance.messages[index]);
  },
  remove: function (index) {
    _instance.messages.splice(index, 1);
    return Promise.resolve();
  },
  update: function (index, msg) {
    // only content can be updated, not the message type.
    var _msg = _instance.messages[index];
    _msg.content = msg.content;
    //log update
    // axios.post("./api/chatlog", {
    //   log: "Bot (Update): " + JSON.stringify(_msg.content),
    // });
    //
    _msg.visible = !msg.loading;
    _msg.loading = !!msg.loading;
    return Promise.resolve(msg.content);
  },
  removeAll: function () {
    _instance.messages.splice(0, _instance.messages.length);
    return Promise.resolve();
  },
};

function mergeAtoB(objA, objB) {
  for (var prop in objA) {
    // if (!objB.hasOwnProperty(prop)) {
    if (!Object.prototype.hasOwnProperty.call(objB, prop)) {
      objB[prop] = objA[prop];
    }
  }
}

function _checkAction(_opts) {
  if (!_opts.action && !_opts.actionButton && !_opts.actionText) {
    throw Error('BotUI: "action" property is required.');
  }
}

function _showActions(_opts) {
  _checkAction(_opts);

  mergeAtoB(
    {
      type: "text",
      cssClass: "",
      autoHide: true,
      addMessage: true,
    },
    _opts
  );

  _instance.action.type = _opts.type;
  _instance.action.cssClass = _opts.cssClass;
  _instance.action.autoHide = _opts.autoHide;
  _instance.action.addMessage = _opts.addMessage;

  return new Promise(function (resolve) {
    _actionResolve = resolve; // resolved when action is performed, i.e: button clicked, text submitted, etc.
    setTimeout(function () {
      _instance.action.show = true;
    }, _opts.delay || 0);
  });
}

_interface.action = {
  show: _showActions,
  hide: function () {
    _instance.action.show = false;
    return Promise.resolve();
  },
  text: function (_opts) {
    _checkAction(_opts);
    _instance.action.text = _opts.action;
    return _showActions(_opts);
  },
  button: function (_opts) {
    _checkAction(_opts);
    _opts.type = "button";
    _instance.action.button.buttons = _opts.action;
    return _showActions(_opts);
  },
  select: function (_opts) {
    _checkAction(_opts);
    _opts.type = "select";
    _opts.action.label = _opts.action.label || "text";
    _opts.action.value = _opts.action.value || "";
    _opts.action.searchselect =
      _opts.action.searchselect || _options.searchselect;
    _opts.action.multipleselect = _opts.action.multipleselect || false;
    if (_opts.action.searchselect && typeof _opts.action.value == "string") {
      if (!_opts.action.multipleselect) {
        for (var i = 0; i < _opts.action.options.length; i++) {
          // Find object
          if (_opts.action.options[i].value == _opts.action.value) {
            _opts.action.value = _opts.action.options[i];
          }
        }
      } else {
        var vals = _opts.action.value.split(",");
        _opts.action.value = new Array();
        for (var k = 0; k < _opts.action.options.length; k++) {
          // Find object
          for (var j = 0; j < vals.length; j++) {
            // Search values
            if (_opts.action.options[k].value == vals[j]) {
              _opts.action.value.push(_opts.action.options[k]);
            }
          }
        }
      }
    }
    if (!_opts.action.searchselect) {
      _opts.action.options.unshift({
        value: "",
        text: _opts.action.placeholder,
      });
    }
    _instance.action.button = _opts.action.button;
    _instance.action.select = _opts.action;
    return _showActions(_opts);
  },
  buttontext: function (_opts) {
    _checkAction(_opts);
    _opts.type = "buttontext";
    _instance.action.button.buttons = _opts.actionButton;
    _instance.action.text = _opts.actionText;
    return _showActions(_opts);
  },
};

if (_options.fontawesome) {
  loadScript(_fontAwesome);
}

export var botui = _interface;
</script>

<style lang="scss">
a.botui-message-content-link:focus {
  outline: thin dotted;

  &:active,
  &:hover {
    outline: 0;
  }
}

form.botui-actions-text {
  margin: 0;
}

button.botui-actions-buttons-button,
input.botui-actions-text-input {
  margin: 0;
  font-size: 100%;
  line-height: normal;
  *vertical-align: middle;
  vertical-align: baseline;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
}

button.botui-actions-buttons-button {
  cursor: pointer;
  *overflow: visible;
  -webkit-appearance: button;
}

.botui-app-container {
  width: 100%; // mobile-first
  height: 100%;
  line-height: 1;

  @media (min-width: 400px) {
    width: 400px;
    height: 500px;
    margin: 0 auto;
  }
}

.botui-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.botui-message {
  margin: 10px 0;
  min-height: 20px;

  &:after {
    display: block;
    content: "";
    clear: both;
  }
}

.human .botui-message-content {
  float: right;
}

.botui-message-content {
  width: auto;
  max-width: 85%;
  display: inline-block;

  &.human {
    float: right;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
}

.botui-message-content-image {
  margin: 5px 0;
  display: block;
  max-width: 200px;
  max-height: 200px;
}

.botui-message-content-link {
  text-decoration: underline;
}

button.botui-actions-buttons-button {
  margin-top: 10px;
  margin-bottom: 10px;

  &:not(:last-child) {
    margin-right: 10px;
  }
}

.botui-actions-text-submit {
  @media (min-width: 400px) {
    display: none;
  }
}

.botui-action-button-icon.fa {
  background-size: contain;
  display: block;
}

.botui-actions-buttons-button-icon {
  background: none;
  box-shadow: none;
}
</style>
