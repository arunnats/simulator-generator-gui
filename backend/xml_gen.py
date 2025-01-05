import json
import xml.etree.ElementTree as ET
from xml.dom import minidom

# Correctly load the JSON file
with open("sample.json", "r") as json_file:
    json_input = json.load(json_file)

def create_instruction_field_value(parent, field_value_data):
    instruction_field_value = ET.SubElement(parent, "instruction_field_value")
    if "instruction_bits" in field_value_data:
        for bit in field_value_data["instruction_bits"]:
            ET.SubElement(
                instruction_field_value,
                "instruction_bits",
                bit_index_lower=str(bit["bit_index_lower"]),
                bit_index_higher=str(bit["bit_index_higher"]),
                value=bit["value"]
            )
    else:
        print("Warning: 'instruction_bits' not found in field_value_data")



def create_instruction(parent, instruction_data):
    instruction = ET.SubElement(parent, "instruction")
    for key, value in instruction_data.items():
        if isinstance(value, dict):
            ET.SubElement(
                instruction,
                key,
                instruction_bit_index_lower=str(value.get("instruction_bit_index_lower", "none")),
                instruction_bit_index_higher=str(value.get("instruction_bit_index_higher", "none")),
                rs1_bit_index_lower=str(value.get("rs1_bit_index_lower", "none")),
                rs1_bit_index_higher=str(value.get("rs1_bit_index_higher", "none")),
                rs2_bit_index_lower=str(value.get("rs2_bit_index_lower", "none")),
                rs2_bit_index_higher=str(value.get("rs2_bit_index_higher", "none")),
                rd_bit_index_lower=str(value.get("rd_bit_index_lower", "none")),
                rd_bit_index_higher=str(value.get("rd_bit_index_higher", "none")),
                immediate_bit_index_lower=str(value.get("immediate_bit_index_lower", "none")),
                immediate_bit_index_higher=str(value.get("immediate_bit_index_higher", "none"))
            )
        else:
            ET.SubElement(instruction, key).text = str(value)


def create_element(parent, element_data):
    element = ET.SubElement(parent, "element")
    create_instruction_field_value(element, element_data.get("instruction_field_value", {}))
    instruction_data = element_data.get("instruction", {})
    if instruction_data:
        create_instruction(element, instruction_data)
    else:
        print("Warning: 'instruction' is missing in element_data")



def json_to_xml(json_data):
    root = ET.Element("processor_specifications")
    arch_specs = ET.SubElement(root, "architecture_specifications")
    isa = ET.SubElement(arch_specs, "ISA")
    
    ET.SubElement(isa, "instructionlen_in_bits").text = str(json_data["processor_specifications"]["architecture_specifications"]["ISA"]["instructionlen_in_bits"])
    mapping = ET.SubElement(isa, "mapping_from_set_of_instruction_field_values_to_set_of_instructions")
    
    for element_data in json_data["processor_specifications"]["architecture_specifications"]["ISA"]["mapping_from_set_of_instruction_field_values_to_set_of_instructions"]:
        create_element(mapping, element_data)
    
    return root


if __name__ == "__main__":    
    # Convert JSON to XML
    xml_root = json_to_xml(json_input)

    # Format the XML with indentation using minidom
    xml_str = ET.tostring(xml_root, encoding="utf-8").decode("utf-8")
    formatted_xml = minidom.parseString(xml_str).toprettyxml(indent="  ")

    # Write to file
    with open("processor_specifications.xml", "w", encoding="utf-8") as xml_file:
        xml_file.write(formatted_xml)

    # Print the formatted XML to console
    print(formatted_xml)
