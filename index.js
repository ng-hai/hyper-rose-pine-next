const PaletteNames = {
  Default: "rose-pine",
  Dawn: "rose-pine-dawn",
  Moon: "rose-pine-moon",
}

const PaletteColors = {
  [PaletteNames.Default]: {
    // Accent
    Love: "#eb6f92",
    Gold: "#f6c177",
    Rose: "#ebbcba",
    Pine: "#31748f",
    Foam: "#9ccfd8",
    Iris: "#c4a7e7",
    // Neutral
    Text: "#e0def4",
    SubtleText: "#6e6a86",
    IgnoredText: "#555169",
    Overlay: "#26233a",
    Surface: "#1f1d2e",
    Base: "#191724",
    // Highlights
    OverlayHighlight: "rgba(110, 106, 134, .4)",
    Highlight: "rgba(110, 106, 134, .2)",
    InactiveHighlight: "rgba(110, 106, 134, .1)",
  },
  [PaletteNames.Dawn]: {
    // Accent
    Love: "#b4637a",
    Gold: "#ea9d34",
    Rose: "#d7827e",
    Pine: "#286983",
    Foam: "#56949f",
    Iris: "#907aa9",
    // Neutral
    Text: "#575279",
    SubtleText: "#6e6a86",
    IgnoredText: "#9893a5",
    Overlay: "#f2e9de",
    Surface: "#fffaf3",
    Base: "#faf4ed",
    // Highlights
    OverlayHighlight: "rgba(110, 106, 134, .15)",
    Highlight: "rgba(110, 106, 134, .08)",
    InactiveHighlight: "rgba(110, 106, 134, .05)",
  },
  [PaletteNames.Moon]: {
    // Accent
    Love: "#eb6f92",
    Gold: "#f6c177",
    Rose: "#ea9a97",
    Pine: "#3e8fb0",
    Foam: "#9ccfd8",
    Iris: "#c4a7e7",
    // Neutral
    Text: "#e0def4",
    SubtleText: "#817c9c",
    IgnoredText: "#59546d",
    Overlay: "#393552",
    Surface: "#2a273f",
    Base: "#232136",
    // Highlights
    OverlayHighlight: "rgba(129, 124, 156, .3)",
    Highlight: "rgba(129, 124, 156, .15)",
    InactiveHighlight: "rgba(129, 124, 156, .08)",
  },
}

const defaultConfig = {
  palette: PaletteNames.Default,
  appearance: {
    dark: PaletteNames.Default,
    light: PaletteNames.Dawn,
  },
  hideControls: false,
  hideNotifications: false,
  hideTabTitle: true,
  hideTabIcons: false,
}

const transformPaletteToConfig = (palette, hyperRosePine) => {
  return {
    // https://github.com/rose-pine/rose-pine-theme/blob/main/palette.md#terminals
    foregroundColor: palette.Text,
    backgroundColor: palette.Base,
    selectionColor: palette.Highlight,
    cursorColor: palette.IgnoredText,
    cursorAccentColor: palette.Text,
    colors: {
      black: palette.Overlay,
      lightBlack: palette.SubtleText,
      red: palette.Love,
      lightRed: palette.Love,
      green: palette.Pine,
      lightGreen: palette.Pine,
      yellow: palette.Gold,
      lightYellow: palette.Gold,
      blue: palette.Foam,
      lightBlue: palette.Foam,
      magenta: palette.Iris,
      lightMagenta: palette.Iris,
      cyan: palette.Rose,
      lightCyan: palette.Rose,
      white: palette.Text,
      lightWhite: palette.Text,
    },
    css: `
      .hyper_main {
        border: 0;
        background: ${palette.Base};
      }

      .header_header {
        top: 0;
        left: 0;
        right: 0;
      }

      .tabs_list {
        background: ${palette.Overlay};
        margin-left: 0;
        padding-left: ${hyperRosePine.hideControls ? "0" : "76px"};
        max-height: 38px;
      }

      .tab_text {
        height: 38px;
        display: flex;
        align-items: center;
      }

      .tab_textInner {
        position: initial;
        width: 100%;
      }

      .tabs_nav {
        color: ${palette.Text};
        height: 38px;
      }

      .tab_tab, .tab_icon {
        color: ${palette.IgnoredText};
      }

      .tab_icon {
        right: 8px;
        top: 11px;
        width: 16px;
        height: 16px;
      }

      .tab_shape {
        width: 8px;
        height: 8px;
      }

      .tab_tab, .tabs_borderShim {
        border-color: transparent !important;
      }

      .tab_tab.tab_active {
        background: ${palette.Base};
      }

      .tab_active .tab_text, .tab_active .tab_icon {
        color: ${palette.Text};
      }

      .xterm-viewport::-webkit-scrollbar-thumb {
        background: ${palette.OverlayHighlight} !important;
      }

      .xterm-viewport::-webkit-scrollbar-thumb:window-inactive {
        background: ${palette.OverlayHighlight} !important;
      }

      .splitpane_divider {
        background-color: ${palette.Overlay} !important;
      }

      .rose-pine-title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${palette.Text};
        height: 38px;
      }

      .rose-pine-title > svg {
        width: 14px;
        margin-right: 8px;
        display: ${hyperRosePine.hideTabIcons ? "none" : "block"};
      }

      .tabs_title .rose-pine-title > span {
        display: ${hyperRosePine.hideTabTitle ? "none" : "block"};
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
          transform:translate(0);
        }
        90% {
          opacity: 0;
          transform:translate(0);
        }
        100% {
          opacity: 0;
          transform:translate(9999px);
        }
      }

      .notifications_view {
        animation: ${
          hyperRosePine.hideNotifications ? "fade-out 5s ease-out both" : "none"
        };
      }
    `,
  }
}

exports.decorateConfig = (config) => {
  const hyperRosePine = {
    ...defaultConfig,
    ...config.hyperRosePine,
    appearance: {
      ...defaultConfig.appearance,
      ...(config.hyperRosePine ? config.hyperRosePine.appearance : {}),
    },
  }

  if (hyperRosePine.hideControls === true) {
    exports.decorateBrowserOptions = (defaultOptions) => {
      return {
        ...defaultOptions,
        frame: false,
        transparent: true,
        titleBarStyle: "",
      }
    }
  }

  let palette = PaletteColors[PaletteNames.Default]
  const selectedPalette = hyperRosePine.palette

  if (Object.values(PaletteNames).includes(selectedPalette)) {
    palette = PaletteColors[selectedPalette]
  }

  return { ...config, ...transformPaletteToConfig(palette, hyperRosePine) }
}

const generateTabIcon = (React, { palette, title }) => {
  return React.createElement("div", {
    className: "rose-pine-title",
    children: [
      React.createElement("svg", {
        key: "icon",
        viewBox: "0 0 198 187",
        children: [
          React.createElement("path", {
            key: "pine-0.5",
            fill: palette.Pine,
            fillOpacity: "0.5",
            d: "M98.983 151.358C94.184 139.832 84.279 130.579 71.287 127.098L14.941 112C7.79401 138.673 23.623 166.09 50.296 173.237L90.543 184.021C93.382 184.782 96.27 183.981 98.298 182.146C100.3 184.672 103.68 185.909 106.99 185.021L147.237 174.237C173.911 167.09 189.74 139.673 182.593 113L126.247 128.098C113.632 131.478 103.928 140.298 98.983 151.358Z",
          }),
          React.createElement("path", {
            key: "pine",
            fill: palette.Pine,
            d: "M99 177.001C94.368 154.178 74.19 137 50 137H0C0 164.614 22.386 187 50 187H98H100H148C175.614 187 198 164.614 198 137H148C123.81 137 103.632 154.178 99 177.001Z",
          }),
          React.createElement("path", {
            key: "rose",
            fill: palette.Rose,
            d: "M95.918 0C105.118 5.312 111.991 13.106 116.181 22.048C128.154 12.575 144.298 8.68599 160.178 12.941L147.237 61.237C142.474 79.013 128.709 91.973 112.16 96.525L112.178 96.593C107.805 97.765 103.411 98.319 99.09 98.309C94.768 98.319 90.374 97.765 86 96.593L86.018 96.525C69.47 91.973 55.704 79.013 50.941 61.237L38 12.941C54.262 8.58399 70.801 12.766 82.853 22.74C83.217 22.036 83.599 21.336 84 20.642L95.918 0Z",
          }),
        ],
      }),
      React.createElement("span", {
        children: title,
        key: "text",
      }),
    ],
  })
}

const useAppearance = (window) => {
  let appearance = {
    isDarkMode: true,
    light: PaletteNames.Dawn,
    dark: PaletteNames.Default,
  }

  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

    const config = window.config.getConfig()
    const hyperRosePine = {
      ...defaultConfig,
      ...config.hyperRosePine,
      appearance: {
        ...defaultConfig.appearance,
        ...(config.hyperRosePine ? config.hyperRosePine.appearance : {}),
      },
    }

    appearance = {
      isDarkMode,
      ...hyperRosePine.appearance,
    }
  }

  return appearance
}

exports.reduceUI = (state, action) => {
  if (
    action.type === "ROSE_PINE_THEME_CHANGE" ||
    action.type === "CONFIG_RELOAD"
  ) {
    const { config } = action

    const hyperRosePine = {
      ...defaultConfig,
      ...config.hyperRosePine,
      appearance: {
        ...defaultConfig.appearance,
        ...(config.hyperRosePine ? config.hyperRosePine.appearance : {}),
      },
    }

    const isDarkMode =
      action.type === "CONFIG_RELOAD" ? state.isDarkMode : action.isDarkMode

    const palette = Boolean(isDarkMode)
      ? PaletteColors[hyperRosePine.appearance.dark]
      : PaletteColors[hyperRosePine.appearance.light]

    const theme = transformPaletteToConfig(palette, hyperRosePine)

    return state
      .set("backgroundColor", theme.backgroundColor)
      .set("foregroundColor", theme.foregroundColor)
      .set("cursorColor", theme.cursorColor)
      .set("selectionColor", theme.selectionColor)
      .set("borderColor", theme.borderColor)
      .set("colors", theme.colors)
      .set("css", theme.css)
      .set("isDarkMode", isDarkMode)
  }
  return state
}

exports.decorateHyper = (Hyper, { React }) => {
  return class extends React.Component {
    componentDidMount() {
      if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")

        window.store.dispatch({
          type: "ROSE_PINE_THEME_CHANGE",
          config: window.config.getConfig(),
          isDarkMode: darkModeQuery.matches,
        })

        darkModeQuery.addEventListener("change", (event) => {
          window.store.dispatch({
            type: "ROSE_PINE_THEME_CHANGE",
            config: window.config.getConfig(),
            isDarkMode: event.matches,
          })
        })
      }
    }

    render() {
      return React.createElement(Hyper, this.props)
    }
  }
}

exports.decorateTabs = (Tabs, { React }) => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        palette: PaletteColors[PaletteNames.Default],
      }
    }

    componentDidMount() {
      const { isDarkMode, light, dark } = useAppearance(window)
      this.setState({
        palette: isDarkMode ? PaletteColors[dark] : PaletteColors[light],
      })
    }

    render() {
      let newProps = { ...this.props }

      const { tabs } = this.props

      if (tabs.length === 1 && this.state.palette !== undefined) {
        newProps = {
          ...this.props,
          tabs: [
            {
              ...tabs[0],
              title: generateTabIcon(React, {
                palette: this.state.palette,
                title: tabs[0].title,
              }),
            },
          ],
        }
      }

      return React.createElement(Tabs, newProps)
    }
  }
}

exports.decorateTab = (Tab, { React }) => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        palette: PaletteColors[PaletteNames.Default],
      }
    }

    componentDidMount() {
      const { isDarkMode, light, dark } = useAppearance(window)
      this.setState({
        palette: isDarkMode ? PaletteColors[dark] : PaletteColors[light],
      })
    }

    render() {
      if (this.state.palette === undefined) {
        return React.createElement(Tab, this.props)
      }

      return React.createElement(Tab, {
        ...this.props,
        text: generateTabIcon(React, {
          palette: this.state.palette,
          title: this.props.text,
        }),
      })
    }
  }
}
