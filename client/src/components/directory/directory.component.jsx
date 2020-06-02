import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySection } from '../../redux/directory/directory.selectors';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

export const Directory = ({ section }) => (
    <div className="directory-menu">
        {section.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} { ...otherSectionProps } />
        ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    section: selectDirectorySection
})

export default connect(mapStateToProps)(Directory);