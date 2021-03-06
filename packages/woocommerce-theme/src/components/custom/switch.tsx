import { Data } from "@frontity/source/types";
import { connect, warn } from "frontity";
import { Package } from "frontity/types";
import React, {
  isValidElement,
  ReactNodeArray,
  ReactElement,
  createElement,
} from "react";

interface SwitchChild {
  when?: boolean;
  data?: Data;
}

/**
 * This is a custom Switch component we are trying for routing in TypeScript
 * themes by using a `data` prop that acts like the `when` but is also sent to
 * the component.
 */
const Switch: React.FC<Package> | null = ({ children }) => {
  const components: ReactNodeArray = React.Children.toArray(children);

  // Check if components[] has a non-ReactNode type Element
  const hasInvalidComponent: boolean =
    components.findIndex((component) => !isValidElement(component)) !== -1;

  // last element in components[]
  const lastComponent = components[components.length - 1];

  // Check if last component is default component - No data props
  const lastComponentIsDefault =
    isValidElement(lastComponent) &&
    (!("data" in lastComponent.props) || !("when" in lastComponent.props));

  if (hasInvalidComponent) {
    warn("Children of <Switch /> component should be a type of ReactNode");
  }

  // Filter components by the value of the 'data' or 'when' props.
  const filteredComponent = components.find(
    (component) =>
      isValidElement<SwitchChild>(component) &&
      (!!component.props.data || component.props.when)
  ) as ReactElement<SwitchChild>;

  // Render filteredComponents.
  if (filteredComponent) {
    const { when, ...props } = filteredComponent.props;
    return createElement(filteredComponent.type, props);
  }

  // Render last component if it's default component (without data props).
  if (lastComponentIsDefault) return <>{lastComponent}</>;

  // Return `null` if none of the children have matched.
  return null;
};

export default connect(Switch);
