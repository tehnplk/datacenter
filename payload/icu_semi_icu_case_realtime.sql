SET @hoscode = (SELECT hospitalcode FROM opdconfig limit 1);

select   
@hoscode as hoscode,
count(ipt.an)as'icu_case',
now() as updated_at 

from ipt
left outer join iptadm on iptadm.an=ipt.an
left outer join bedno  on bedno.bedno=iptadm.bedno
where bedno.export_code='199100'
and ipt.dchstts is null