/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

function is_all_rows_hidden(value) {
  return value.hidden == false;
}

function toArray(iter) {
  if (iter === null) {
    return null;
  }
  return Array.prototype.slice.call(iter);
}

function showAllExtras() {
  // eslint-disable-line no-unused-vars
  findAll('.col-result').forEach(showExtras);
}

function hideAllExtras() {
  // eslint-disable-line no-unused-vars
  findAll('.col-result').forEach(hideExtras);
}

function showExtras(colresultElem) {
  const extras = colresultElem.parentNode.nextElementSibling;
  const expandcollapse = colresultElem.firstElementChild;
  extras.classList.remove('collapsed');
  expandcollapse.classList.remove('expander');
  expandcollapse.classList.add('collapser');
}

function hideExtras(colresultElem) {
  const extras = colresultElem.parentNode.nextElementSibling;
  const expandcollapse = colresultElem.firstElementChild;
  extras.classList.add('collapsed');
  expandcollapse.classList.remove('collapser');
  expandcollapse.classList.add('expander');
}

function addCollapse() {
  // Add show/hide link to each result
  findAll('.col-result').forEach(function (elem) {
    const collapsed = getQueryParameter('collapsed') || 'Passed';
    const extras = elem.parentNode.nextElementSibling;
    const expandcollapse = document.createElement('span');
    if (extras.classList.contains('collapsed')) {
      expandcollapse.classList.add('expander');
    } else if (collapsed.includes(elem.innerHTML)) {
      extras.classList.add('collapsed');
      expandcollapse.classList.add('expander');
    } else {
      expandcollapse.classList.add('collapser');
    }
    elem.appendChild(expandcollapse);

    elem.addEventListener('click', function (event) {
      if (
        event.currentTarget.parentNode.nextElementSibling.classList.contains(
          'collapsed'
        )
      ) {
        showExtras(event.currentTarget);
      } else {
        hideExtras(event.currentTarget);
      }
    });
  });
}

function getQueryParameter(name) {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
function init() {
  // eslint-disable-line no-unused-vars
  setTimeout(() => {
    findAll('input[name="filter_checkbox"]').forEach((elem) => {
      elem.addEventListener('click', (evt) => {
        const { target: element } = evt;
        const { testResult } = element.dataset;

        doFilter(testResult, element.checked);
      });
    });
    initRender();
    addCollapse();
  });
}
