import React from 'react';
import PropTypes from 'prop-types';
const TableHeader = ({selectedSort, onSort, columns}) => {
    const handelSort = (item) => {
        if (selectedSort.path === item) {
            onSort({...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc'});
        } else {
            onSort({path: item, order: 'asc'});
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key={column}
                        onClick={columns[column].path
                            ? () => handelSort(columns[column].path)
                            : undefined
                        }
                        {...{role: columns[column].path && 'button'}}
                        scope="col">
                        {columns[column].name}
                        { columns[column].path === selectedSort.path
                            ? <i className={'bi bi-caret' + (selectedSort.order === 'asc' ? '-up-fill m-2' : '-down-fill m-2')}></i>
                            : undefined
                        }
                    </th>
                ))}

            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;
