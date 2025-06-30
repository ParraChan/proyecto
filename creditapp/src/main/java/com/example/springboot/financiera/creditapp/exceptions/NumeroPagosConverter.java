package com.example.springboot.financiera.creditapp.exceptions;

import com.example.springboot.financiera.creditapp.entities.Credito;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class NumeroPagosConverter implements AttributeConverter<Credito.NumeroPagos, String> {

    @Override
    public String convertToDatabaseColumn(Credito.NumeroPagos attribute) {
        if (attribute == null) return null;
        return attribute.getValue();  // "10", "12", ...
    }

    @Override
    public Credito.NumeroPagos convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return Credito.NumeroPagos.fromValue(dbData);
    }
}
