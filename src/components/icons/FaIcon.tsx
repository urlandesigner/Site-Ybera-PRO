"use client";

import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type FaIconProps = FontAwesomeIconProps;

/** Ícone Font Awesome Pro (SVG). Use `icon={faName}` importado de `@fortawesome/pro-solid-svg-icons`. */
export function FaIcon(props: FaIconProps) {
  return <FontAwesomeIcon {...props} />;
}
