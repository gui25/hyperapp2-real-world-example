import Page from "../web_modules/page.js";

let page = Page.create();
const router = (dispatch, { routes }) => {
  page = Page.create();
  const paths = Object.keys(routes);
  paths.forEach(path => {
    const route = routes[path];
    page(path, context => {
      if(route.length === 0) {
        route().then(lazyRoute => dispatch(lazyRoute, context.params));
      } else {
        dispatch(route, context.params);
      }

    });
  });

  page.start({ hashbang: true });

  return () => {
    page.stop();
  };
};

export const RoutePages = ({ routes }) => [router, { routes }];

const redirectEffect = (dispatch, props) => page.redirect(props.path);
export const Redirect = props => [redirectEffect, props];
export const RedirectAction = path => state => [state, Redirect({ path })];
