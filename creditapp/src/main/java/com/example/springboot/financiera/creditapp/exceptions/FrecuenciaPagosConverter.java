package com.example.springboot.financiera.creditapp.exceptions;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import com.example.springboot.financiera.creditapp.entities.Credito.FrecuenciaPagos;

@Converter(autoApply = true)
public class FrecuenciaPagosConverter implements AttributeConverter<FrecuenciaPagos, String> {

    @Override
    public String convertToDatabaseColumn(FrecuenciaPagos attribute) {
        if (attribute == null) return null;
        return attribute.name();
    }

    @Override
    public FrecuenciaPagos convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return FrecuenciaPagos.valueOf(dbData);
    }
}