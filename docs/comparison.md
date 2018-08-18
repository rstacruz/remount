# Comparison

## Basic features

|                                  |      Remount       | [React docs example] | [react-web-component] |  [react-mounter]   | [reactive-elements] |
| -------------------------------- | :----------------: | :------------------: | :-------------------: | :----------------: | :-----------------: |
| a. Mounting React components     | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   | :white_check_mark: | :white_check_mark:  |
| b. Using within React components | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   | :white_check_mark: | :white_check_mark:  |

## Components

|                      |      Remount       | [React docs example] | [react-web-component] |  [react-mounter]   | [reactive-elements] |
| -------------------- | :----------------: | :------------------: | :-------------------: | :----------------: | :-----------------: |
| a. React props       | :white_check_mark: |                      |  :white_check_mark:   | :white_check_mark: |          ?          |
| b. Non-string props  | :white_check_mark: |                      |                       | :white_check_mark: |          ?          |
| c. Attribute updates | :white_check_mark: |                      |                       | :white_check_mark: |          ?          |

## API

|             |                    Remount                    |             [React docs example]              |             [react-web-component]             |           [react-mounter]           |              [reactive-elements]              |
| ----------- | :-------------------------------------------: | :-------------------------------------------: | :-------------------------------------------: | :---------------------------------: | :-------------------------------------------: |
| a. API used | :white_check_mark: <br> Web Components (fast) | :white_check_mark: <br> Web components (fast) | :white_check_mark: <br> Web components (fast) | :warning: <br> DOM traversal (slow) | :white_check_mark: <br> Web components (fast) |

## Shadow DOM

|                        |      Remount       | [React docs example] | [react-web-component] | [react-mounter] | [reactive-elements] |
| ---------------------- | :----------------: | :------------------: | :-------------------: | :-------------: | :-----------------: |
| a. Shadow DOM mode     | :white_check_mark: |                      |                       |                 |          ?          |
| b. Non-shadow DOM mode | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   |                 |          ?          |

## Properties

|                          |      Remount       | [React docs example] | [react-web-component] |  [react-mounter]   | [reactive-elements] |
| ------------------------ | :----------------: | :------------------: | :-------------------: | :----------------: | :-----------------: |
| a. React props           | :white_check_mark: |  :white_check_mark:  |  :white_check_mark:   | :white_check_mark: |          ?          |
| b. `this.props.children` |                    |                      |                       | :white_check_mark: |          ?          |
| c. Nesting               |                    |                      |                       | :white_check_mark: |          ?          |

## Others

|                             |              Remount               |        [React docs example]        | [react-web-component] |             [react-mounter]              | [reactive-elements] |
| --------------------------- | :--------------------------------: | :--------------------------------: | :-------------------: | :--------------------------------------: | :-----------------: |
| a. Third-party dependencies | :white_check_mark: <br> just React | :white_check_mark: <br> just React |           -           |        JSXTransformer/react-tools        |          ?          |
| b. React API                |          just React's API          |          just React's API          |   just React's API    | Extended React API with custom callbacks |          ?          |
| c. License                  |               `MIT`                |               `MIT`                |         `MIT`         |                  `MIT`                   |        `MIT`        |

[react docs example]: https://reactjs.org/docs/web-components.html
[react-mounter]: https://yarnpkg.com/en/package/react-mounter
[react-web-component]: https://yarnpkg.com/en/package/react-web-component
[reactive-elements]: https://yarnpkg.com/en/package/reactive-elements
