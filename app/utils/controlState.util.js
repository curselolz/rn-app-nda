export const fillAddresses = data => {
    var newState = {
      selected: '',
      controlType: '',
      values: []
    };
    if (data) {
      const firstAddress = data.filter(item => item.is_primary === true)[0];
      newState.selected = firstAddress.id;
      data.map(item => {
        newState.values.push({
          label: `${item.state}, ${item.address}`,
          value: item.id
        });
      });
      newState.values.push({ label: "Add new address", value: "addNew" });
      newState.controlType = "picker";
    }
    return newState;
  };

  export const fillCards = data => {
    var newState = {
      selected: '',
      controlType: '',
      values: []
    }
    if (data.cards) {
      const card = data.cards.filter(item => item.primary === true)[0];
      newState.selected = card.id;
      data.cards.map(item => {
        newState.values.push({
          label: `${item.type}      **** **** **** ${item.last4}`,
          value: item.id
        });
      });
      newState.values.push({ label: "Add new card", value: "addNew" });
      newState.controlType = "picker";
    }
    return newState;
  };
  
  export const fillFeatures = (state, data) => {
    let newState = { ...state }
    newState.price = {
      ...newState.price,
      selected: [1, data.price],
      maxValue: data.price
    }
    data.data && data.data.map(i => {
      i.map(item => {
        let options = item.options.map(i => {
          return { label: i.name, value: i.id }
        })
        options.splice(0, 0, { label: 'None', value: 'None' })
  
        newState[item.name] = {
          selected: 'None',
          feature: item.options[0].feature_id,
          controlType: 'picker',
          values: options
        }
        newState.features = !newState.features.includes(item.name) ? [...newState.features,  item.name ] : newState.features
        newState['loaded'] = true
      })
    })
    return newState
  }