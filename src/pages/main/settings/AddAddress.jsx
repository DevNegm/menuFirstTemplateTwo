import React, { useEffect, useState } from 'react';
import classes from './AddAddress.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, editAddress, getAddress, getUser } from '../../../store/slices/mainReducer';

const AddAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { addAddressLoading, addAddressError, editAddressLoading } = useSelector(state => state.main);
  const [position, setPosition] = useState(null);
  const [addressText, setAddressText] = useState('');
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState({
    buildingName: '',
    apartmentNumber: '',
    floor: '',
    tradeMark: '',
    streetName: '',
    phoneNumber: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([23.8859, 45.0792]);

  const getAddressMap = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (!id) {
        setAddressText(data.display_name);
        setAddress(prev => ({
          ...prev,
          streetName: data?.address?.road,
          tradeMark: data?.address?.suburb,
          buildingName: data?.address?.house_number
        }));
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleAddAddress = () => {
    dispatch(addAddress({ ...address, userId: user })).then((res) => {
      if (res?.payload?.id) {
        navigate(-1);
      }
    });
  };

  const handleEditAddress = () => {
    dispatch(editAddress(address, id)).then((res) => {
      if (res?.payload?.id) {
        navigate(-1);
      }
    });
  };

  useEffect(() => {
    if (address.buildingName && address.apartmentNumber && address.floor && address.streetName && address.phoneNumber) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address]);

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      setUser(res?.payload?.id);
      setAddress(prev => ({ ...prev, userId: res?.payload?.id }));
    });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userPosition = [coords.latitude, coords.longitude];
        setPosition(userPosition);
        setMapCenter(userPosition);
        getAddressMap(coords.latitude, coords.longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getAddress(id)).then((res) => {
        setAddressText(`${res?.payload?.buildingName},${res?.payload?.streetName},${res?.payload?.tradeMark},${res?.payload?.apartmentNumber},${res?.payload?.floor},${res?.payload?.phoneNumber}`);
        setAddress({
          buildingName: res?.payload?.buildingName,
          apartmentNumber: res?.payload?.apartmentNumber,
          floor: res?.payload?.floor,
          tradeMark: res?.payload?.tradeMark,
          streetName: res?.payload?.streetName,
          phoneNumber: res?.payload?.phoneNumber,
          id: res?.payload?.id,
          userId: res?.payload?.userId
        });
      });
    }
  }, [id]);

  const DraggableMarker = () => {
    const onMarkerDragEnd = (event) => {
      const newLatLng = event.target.getLatLng();
      setPosition([newLatLng.lat, newLatLng.lng]);
      getAddressMap(newLatLng.lat, newLatLng.lng);
    };

    return (
      position ? (
        <Marker
          position={position}
          draggable={true}
          eventHandlers={{ dragend: onMarkerDragEnd }}
        />
      ) : null
    );
  };

  const ChangeMapView = ({ center }) => {
    const map = useMapEvents({});
    map.setView(center, map.getZoom());
    return null;
  };

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h3>اضافة عنوان جديد</h3>
        <button className={classes.backBtn} onClick={() => navigate(-1)}>
          <BsArrowLeft />
        </button>
      </div>
      <div className={classes.address}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
          <ChangeMapView center={mapCenter} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <DraggableMarker />
        </MapContainer>
        <p>عنوانك الحالى: {addressText || 'جارى تحديد العنوان...'}</p>
      </div>
      <div className={classes.addressForm}>
        <p>تفاصيل العنوان</p>
        <Input placeholder={'اسم المبنى'} value={address?.buildingName} onChange={(e) => setAddress({ ...address, buildingName: e.target.value })} />
        <div className={classes.row}>
          <Input placeholder={'رقم الشقة'} value={address?.apartmentNumber} onChange={(e) => setAddress({ ...address, apartmentNumber: e.target.value })} />
          <Input placeholder={'الدور'} value={address?.floor} onChange={(e) => setAddress({ ...address, floor: e.target.value })} />
        </div>
        <Input placeholder={'اسم الشارع'} value={address?.streetName} onChange={(e) => setAddress({ ...address, streetName: e.target.value })} />
        <Input placeholder={'علامة مميزة (اختيارى)'} value={address?.tradeMark} onChange={(e) => setAddress({ ...address, tradeMark: e.target.value })} />
        <Input placeholder={'رقم الجوال'} value={address?.phoneNumber} onChange={(e) => { if (/^\d*$/.test(e.target.value)) setAddress({ ...address, phoneNumber: e.target.value }) }} />
        {id ? (
          <Button disabled={disabled || editAddressLoading} loading={editAddressLoading} onClick={handleEditAddress}>
            تعديل العنوان
          </Button>
        ) : (
          <Button disabled={disabled || addAddressLoading} loading={addAddressLoading} onClick={handleAddAddress}>
            إضافة العنوان
          </Button>
        )}
      </div>
    </section>
  );
};

export default AddAddress;
