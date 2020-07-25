<p align='center'>
<img alt='Tyne' src='./logo-wordmark.svg' height="96" />
</p>
<p align='center'>
<a href="https://npmcharts.com/compare/tyne?minimal=true"><img src="https://img.shields.io/npm/dm/tyne.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/tyne"><img src="https://img.shields.io/npm/v/tyne.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/tyne"><img src="https://img.shields.io/npm/l/tyne.svg?sanitize=true" alt="License"></a>
</p>
<p align='center'>
A tiny JavaScript framework for building UI with minimal overhead.
</p>

## Example

Following JavaScript...

    select(["head", "get", "post"])

will generate following HTML.

    <select>
      <option value="head">head</option>
      <option value="get">get</option>
      <option value="post">post</option>
    </select>

To add inline style...

_js_

    select(["head", "get", "post"], {
      style: { textTransform: "uppercase" }
    })

_html_

    <select>
      <option style="text-transform: uppercase" value="head">head</option>
      <option style="text-transform: uppercase" value="get">get</option>
      <option style="text-transform: uppercase" value="post">post</option>
    </select>

To add generated element to document...

    const methodType = select(["head", "get", "post"], {
      style: { textTransform: "uppercase" }
    })
    document.body.appendChild(methodType);

or shorthand version

    select(["head", "get", "post"], {
      style: { textTransform: "uppercase" }
    }, document.body)

## Example Projects

- [template](https://github.com/tynejs/template)
- [rest-helper](https://gitlab.com/merzin/rest-helper)
