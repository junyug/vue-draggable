'use strict';
exports.install = function(Vue, options) {
  var dropTo = '';
  var dragstart, dragend, dragenter, dragover, dragleave, drop;
  Vue.directive('draggable', {
    bind: function(el, binding) {
        dragstart = function(event) {
        dropTo = binding.arg;
        el.classList.add(binding.value.dragged);
        event.dataTransfer.effectAllowed = 'all';
        event.dataTransfer.setData('data', JSON.stringify(binding.value));
        event.dataTransfer.setData('tag', binding.arg);
        return false;
      };
        dragend = function(event) {
        el.classList.remove(binding.value.dragged);
        return false;
      };
      el.setAttribute('draggable', true);
      el.addEventListener('dragstart', dragstart);
      el.addEventListener('dragend', dragend);
    },
    inserted: function(el, binding) {
    },
    unbind: function(el, binding) {
      el.setAttribute('draggable', false);
      el.removeEventListener('dragstart', dragstart);
      el.removeEventListener('dragend', dragend);
    },
    update: function(el, binding) {
      // data = binding.value;
    }
  });
  Vue.directive('dropzone', {
    acceptStatement: true,
    bind: function(el, binding) {
      dragenter = function(event) {
        if (dropTo == binding.arg) {
          el.classList.add(binding.arg);
        }
        return false;
      };
      dragover = function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (dropTo == binding.arg) {
          event.dataTransfer.effectAllowed = 'all';
          event.dataTransfer.dropEffect = 'copy';
        }
        return false;
      };
      dragleave = function(event) {
        if (dropTo == binding.arg) {
          el.classList.remove(binding.arg);
        }
        return false;
      };
      drop = function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        var tag = event.dataTransfer.getData('tag');
        var data = event.dataTransfer.getData('data');
        if (dropTo == binding.arg) {
          handler(JSON.parse(data));
          el.classList.remove(binding.arg);
        }
        return false;
      };
      const handler = function (data) {
        binding.value.handler(binding.value.index, data);
      };
      el.addEventListener('dragenter', dragenter);
      el.addEventListener('dragleave', dragleave);
      el.addEventListener('dragover', dragover);
      el.addEventListener('drop', drop);
    },
    unbind: function(el, binding) {
      el.removeEventListener('dragenter', dragenter);
      el.removeEventListener('dragleave', dragleave);
      el.removeEventListener('dragover', dragover);
      el.removeEventListener('drop', drop);
    },
    update: function(el, binding) {
    }
  });
};
