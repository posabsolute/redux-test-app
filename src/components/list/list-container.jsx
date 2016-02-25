import React from 'react';
import ListItem from 'components/list/list-item';

export default class ListContainer extends React.Component {
  getString(element, modifier, item) {
    if (typeof element === 'string') {
      return !modifier ? item[element] : modifier(item[element]);
    }

    if (typeof element === 'object') {
      let content = item;
      element.map(field => content = content[field]);
      return !modifier ? content : modifier(content);
    }
  }

  render() {
    const {title, items, map, onClick, labelsMod, titleMod, floatingLabelMod, descMod} = this.props;
    return (
      <div className="list-item_container col-lg-12">
        { title ? <div className="list-title">{title}</div> : null }
        {items.map((item, index) =>
          <ListItem
            index={index}
            key={'list' + index}
            onClick={onClick.bind(null, item)}
            title={this.getString(map.title, titleMod, item)}
            floatingLabel={this.getString(map.floatingLabel, floatingLabelMod, item)}
            labels={this.getString(map.labels, labelsMod, item)}
            desc={this.getString(map.desc, descMod, item)}
            listItem={item}
          />
        )}
      </div>
    );
  }
}


ListContainer.propTypes = {
  title: React.PropTypes.string,
  items: React.PropTypes.array,
  map: React.PropTypes.object,
  onClick: React.PropTypes.func,
  labelsMod: React.PropTypes.func,
  titleMod: React.PropTypes.func,
  floatingLabelMod: React.PropTypes.func,
  descMod: React.PropTypes.func,
};
