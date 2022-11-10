import React from 'react';

export default (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={props.opacity || ''} d="M0 120 l0 -120 120 0 120 0 0 120 0 120 -120 0 -120 0 0 -120z"
            fill={props.fill || "#9FA2B4"}
        />
    </svg>
);
