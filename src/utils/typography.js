import Typography from 'typography';
import FairyGates from 'typography-theme-fairy-gates';

const mainRed = '#FF7272';
FairyGates.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      color: mainRed,
      textShadow: 'none',
      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${mainRed} 1px, ${mainRed} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
    },
    code: {
      fontSize: '.75em!important',
    },
    blockquote: {
      borderLeftColor: mainRed,
    },
  };
};

// delete FairyGates.googleFonts

const typography = new Typography(FairyGates);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
