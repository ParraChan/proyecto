package com.example.springboot.financiera.creditapp.exceptions;


import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import com.example.springboot.financiera.creditapp.entities.Credito.EstatusPago;

@Converter(autoApply = true)
public class EstatusPagoConverter implements AttributeConverter<EstatusPago, String> {

    @Override
    public String convertToDatabaseColumn(EstatusPago attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getDescripcion();  // guarda la descripción (con espacios) en la BD
    }

    @Override
    public EstatusPago convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return EstatusPago.fromDescripcion(dbData);  // convierte la descripción a enum
    }
}

